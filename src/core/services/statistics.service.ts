import { AnimalService } from "./animal.service";
import { PersonService } from "./person.service";
import type {
  AnimalSpeciesCount,
  Animal,
  OwnershipStats,
  OwnerWeightStats,
} from "../entities/types";

export class StatisticsService {
  constructor(
    private readonly animalService: AnimalService,
    private readonly personService: PersonService
  ) {}

  async getGlobalStatistics() {
    const [
      mostCommonSpecies,
      heaviestAnimal,
      oldestAnimal,
      topOwner,
      ownerWithHeaviestPets,
    ] = await Promise.all([
      this.animalService.getMostCommonSpecies(),
      this.animalService.getHeaviestAnimal(),
      this.animalService.getOldestAnimal(),
      this.personService.getTopOwner(),
      this.personService.getOwnerWithHeaviestPets(),
    ]);

    return {
      speciesDistribution: mostCommonSpecies,
      recordHolders: {
        heaviestAnimal: {
          ...heaviestAnimal,
          formattedWeight: this.animalService.formatWeight(heaviestAnimal.weight),
        },
        oldestAnimal: {
          ...oldestAnimal,
          age: this.animalService.getAnimalAge(oldestAnimal.dateOfBirth),
        },
      },
      ownershipRecords: {
        mostAnimals: {
          ...topOwner,
          ownerName: this.personService.getFullName(topOwner.owner),
        },
        heaviestGroup: {
          ...ownerWithHeaviestPets,
          ownerName: this.personService.getFullName(ownerWithHeaviestPets.owner),
          formattedTotalWeight: this.animalService.formatWeight(
            ownerWithHeaviestPets.totalWeight
          ),
        },
      },
    };
  }

  getSpeciesPercentage(
    speciesCount: AnimalSpeciesCount[],
    totalAnimals: number
  ): Array<AnimalSpeciesCount & { percentage: number }> {
    return speciesCount.map((species) => ({
      ...species,
      percentage: (species.count / totalAnimals) * 100,
    }));
  }

  calculateAverageWeight(animals: Animal[]): number {
    if (!animals.length) return 0;
    const totalWeight = animals.reduce((sum, animal) => sum + animal.weight, 0);
    return totalWeight / animals.length;
  }

  calculateAverageAge(animals: Animal[]): number {
    if (!animals.length) return 0;
    const totalAge = animals.reduce(
      (sum, animal) => sum + this.animalService.getAnimalAge(animal.dateOfBirth),
      0
    );
    return totalAge / animals.length;
  }
}
