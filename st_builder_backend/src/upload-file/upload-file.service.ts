import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadFileService {
  constructor(private readonly prisma: PrismaService) {}

  async saveFilePath(filePath: string) {
    return this.prisma.file.create({
      data: { path: filePath },
    });
  }
}
