import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService) {}

  async runSeed() {
    await this.insertNewProducts();

    return `SEED EXCUTE`;
  }

  private async insertNewProducts() {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises = [];

    products.forEach((product) => {
      // no es return implicito porque no estoy devolviendo nada, solo ejecutando el metodo create
      insertPromises.push(this.productsService.create(product));
    });

    await Promise.all(insertPromises);
    return true;
  }
}
