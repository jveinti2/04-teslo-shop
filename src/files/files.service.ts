import { join } from 'path';
import { existsSync } from 'fs';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  getFile(imageName: string) {
    const path = join(__dirname, '../../static/products', imageName);
    if (!existsSync) throw new BadRequestException('File not found');

    return path;
  }
}
