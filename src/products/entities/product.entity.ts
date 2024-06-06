import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from 'src/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '61190e91-fae1-4f19-be2b-3bd621881f20',
    description: 'The unique identifier',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Nike Air Max 90',
    description: 'The title of the product',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  title: string;

  @ApiProperty({
    example: 100,
    description: 'The price of the product',
  })
  @Column('float', {
    default: 0,
  })
  price: number;

  @ApiProperty({
    example: 'The best product ever',
    description: 'The description of the product',
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty({
    example: 'nike_air_max_90',
    description: 'The slug of the product',
  })
  @Column('text', {
    unique: true,
  })
  slug: string;

  @ApiProperty({
    example: 100,
    description: 'The stock of the product',
  })
  @Column('float', {
    default: 0,
  })
  stock: number;

  @ApiProperty({
    example: ['SM', 'M', 'L'],
    description: 'The sizes of the product',
  })
  @Column('text', {
    array: true,
  })
  sizes: string[];

  @ApiProperty({
    example: 'men',
    description: 'The gender of the product',
  })
  @Column('text')
  gender: string;

  @ApiProperty({
    example: ['nike', 'shoes'],
    description: 'The tags of the product',
  })
  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  @ApiProperty({
    example: '61190e91-fae1-4f19-be2b-3bd621881f20',
    description: 'The user that created the product',
  })
  @OneToMany(() => ProductImage, (prodyctImage) => prodyctImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.title
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
