import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from './helpers';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('product/:imageName')
  findOne(@Res() res: Response, @Param('imageName') imageName: string) {
    const path = this.filesService.getFile(imageName);

    res.sendFile(path);
  }

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('File not found');

    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`;

    return { secureUrl };
  }
}
