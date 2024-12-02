import { AnimalRepository } from "../../infrastructure/repositories/animal.repository";
import type {
  Animal,
  PaginatedAnimalResponse,
  AnimalSpeciesCount,
  OrderByInput,
} from "../entities/types";

export class AnimalService {
  constructor(private readonly animalRepository: AnimalRepository) {}

  async getAnimals(
    page: number = 1,
    take: number = 10,
    orderBy?: OrderByInput
  ): Promise<PaginatedAnimalResponse> {
    return this.animalRepository.getAnimals(page, take, orderBy);
  }

  async getAnimal(id: number): Promise<Animal> {
    return this.animalRepository.getAnimal(id);
  }

  async getMostCommonSpecies(): Promise<AnimalSpeciesCount[]> {
    return this.animalRepository.getMostCommonSpecies();
  }

  async getHeaviestAnimal(): Promise<Animal> {
    return this.animalRepository.getHeaviestAnimal();
  }

  async getOldestAnimal(): Promise<Animal> {
    return this.animalRepository.getOldestAnimal();
  }

  getAnimalAge(dateOfBirth: string): number {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  formatWeight(weight: number): string {
    if (weight >= 1000) {
      return `${(weight / 1000).toFixed(1)} kg`;
    }
    return `${weight} g`;
  }
}
