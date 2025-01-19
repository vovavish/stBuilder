import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { UserDto } from 'src/user/dto';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signupLocal(dto: AuthDto): Promise<Tokens & {userDto: UserDto}> {
    const hashedPassword = await this.hashData(dto.password);

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash: hashedPassword,
      }
    });

    const tokens = await this.getTokens(newUser.id, newUser.email, newUser.roles);

    await this.updateRtHash(newUser.id, tokens.refresh_token);

    const userDto: UserDto = {
      userId: newUser.id,
      email: newUser.email,
      username: newUser.username,
      roles: newUser.roles,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    }

    return {...tokens, userDto: userDto};
  }


  async signinLocal(dto: AuthDto): Promise<Tokens & {userDto: UserDto}> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      }
    });
    
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);

    if (!passwordMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user.id, user.email, user.roles);

    await this.updateRtHash(user.id, tokens.refresh_token);

    const userDto: UserDto = {
      userId: user.id,
      email: user.email,
      username: user.username,
      roles: user.roles,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    return { ...tokens, userDto: userDto };
  }

  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        refreshTokenHash: {
          not: null,
        }
      },
      data: {
        refreshTokenHash: null,
      }
    })
  }

  async refreshTokens(userId: number, rt: string): Promise<Tokens & {userDto: UserDto}> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      }
    });

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    if (!user.refreshTokenHash) {
      throw new ForbiddenException('Access Denied');
    }

    const rtMatches = await bcrypt.compare(rt, user.refreshTokenHash);

    if (!rtMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user.id, user.email, user.roles);

    await this.updateRtHash(user.id, tokens.refresh_token);
    
    const userDto: UserDto = {
      userId: user.id,
      email: user.email,
      username: user.username,
      roles: user.roles,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    return { ...tokens, userDto: userDto };
  }

  private hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  private async getTokens(userId: number, email: string, roles: string[]): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync({
        sub: userId,
        email,
        roles,
      }, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      }),
      this.jwtService.signAsync({
        sub: userId,
        email,
        roles,
      }, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      })
    ])
    
    return {
      access_token: at,
      refresh_token: rt,
    }
  }

  private async updateRtHash(userId: number, rt: string) {
    const refreshTokenHash = await this.hashData(rt);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshTokenHash: refreshTokenHash,
      }
    })
  }
}
