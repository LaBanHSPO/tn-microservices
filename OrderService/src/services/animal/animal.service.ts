import { Injectable } from '@nestjs/common';
import { Animal } from './animal.schema';

@Injectable()
export class AnimalService {

  constructor(
  ) { }
  async createAnimal(): Promise<Animal> {

    return {
      id: 1, name: 'Cat4',
    }
  }
}