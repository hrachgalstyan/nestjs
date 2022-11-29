import { Inject, Injectable, Optional } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService<T> {
  constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}

  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);

    return cat;
  }

  findAll({ limit, offset }): Cat[] {
    return this.cats.slice(offset, offset + limit);
  }
}
