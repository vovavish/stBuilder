import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileService } from './upload-file.service';
import { AtGuard } from 'src/common/guadrs';

@Controller('upload')
export class UploadFileController {
  constructor(private readonly uploadService: UploadFileService) {}

  @UseGuards(AtGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const filePath = `${baseUrl}/uploads/${file.filename}`;
    await this.uploadService.saveFilePath(filePath);
    return { filePath };
  }
}
