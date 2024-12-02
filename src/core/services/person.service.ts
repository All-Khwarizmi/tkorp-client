import { PersonRepository } from '../../infrastructure/repositories/person.repository';
import type {
  Person,
  PaginatedPersonResponse,
  OwnershipStats,
  OwnerWeightStats,
} from '../entities/types';

export class PersonService {
  constructor(private readonly personRepository: PersonRepository) {}

  async getPersons(page: number = 1, take: number = 10): Promise<PaginatedPersonResponse> {
    return this.personRepository.getPersons(page, take);
  }

  async getPerson(id: number): Promise<Person> {
    return this.personRepository.getPerson(id);
  }

  async getTopOwner(): Promise<OwnershipStats> {
    return this.personRepository.getTopOwner();
  }

  async getTopCatOwner(): Promise<OwnershipStats> {
    return this.personRepository.getTopCatOwner();
  }

  async getOwnerWithHeaviestPets(): Promise<OwnerWeightStats> {
    return this.personRepository.getOwnerWithHeaviestPets();
  }

  getFullName(person: Person): string {
    return `${person.firstName} ${person.lastName}`;
  }

  formatPhoneNumber(phoneNumber: string): string {
    // Format: XX XX XX XX XX
    return phoneNumber.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
  }

  getAnimalCount(person: Person): number {
    return person.animals?.length || 0;
  }
}
