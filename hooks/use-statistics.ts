import { useQuery } from '@apollo/client';
import { STATISTICS_QUERIES } from '../src/infrastructure/graphql/queries';
import type {
  AnimalSpeciesCount,
  OwnershipStats,
  Animal,
  OwnerWeightStats,
} from '../src/core/entities/types';

interface StatisticsData {
  mostCommonSpecies: AnimalSpeciesCount[];
  topOwner: OwnershipStats;
  heaviestAnimal: Animal;
  oldestAnimal: Animal;
  ownerWithHeaviestPets: OwnerWeightStats;
}

export function useStatistics() {
  const { data: speciesData, loading: speciesLoading } = useQuery<{
    mostCommonSpecies: AnimalSpeciesCount[];
  }>(STATISTICS_QUERIES.MOST_COMMON_SPECIES);

  const { data: topOwnerData, loading: topOwnerLoading } = useQuery<{
    topOwner: OwnershipStats;
  }>(STATISTICS_QUERIES.TOP_OWNER);

  const { data: heaviestAnimalData, loading: heaviestAnimalLoading } = useQuery<{
    heaviestAnimal: Animal;
  }>(STATISTICS_QUERIES.HEAVIEST_ANIMAL);

  const { data: oldestAnimalData, loading: oldestAnimalLoading } = useQuery<{
    oldestAnimal: Animal;
  }>(STATISTICS_QUERIES.OLDEST_ANIMAL);

  const { data: heaviestPetsOwnerData, loading: heaviestPetsOwnerLoading } = useQuery<{
    ownerWithHeaviestPets: OwnerWeightStats;
  }>(STATISTICS_QUERIES.OWNER_WITH_HEAVIEST_PETS);

  const isLoading =
    speciesLoading ||
    topOwnerLoading ||
    heaviestAnimalLoading ||
    oldestAnimalLoading ||
    heaviestPetsOwnerLoading;

  return {
    speciesDistribution: speciesData?.mostCommonSpecies || [],
    topOwner: topOwnerData?.topOwner,
    heaviestAnimal: heaviestAnimalData?.heaviestAnimal,
    oldestAnimal: oldestAnimalData?.oldestAnimal,
    ownerWithHeaviestPets: heaviestPetsOwnerData?.ownerWithHeaviestPets,
    isLoading,
  };
}
