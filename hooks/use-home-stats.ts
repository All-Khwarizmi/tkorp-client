import { useAnimalService, usePersonService } from '@/src/core/store/app.store';
import { AnimalSpeciesCount } from '@/src/core/entities/types';
import { useCallback, useEffect, useState } from 'react';

interface HomeStats {
  totalAnimals: number;
  totalOwners: number;
  oldestAnimal: {
    name: string;
    age: number;
  };
  heaviestAnimal: {
    name: string;
    weight: number;
  };
  topOwner: {
    name: string;
    count: number;
  };
  mostCommonSpecies: {
    species: string;
    count: number;
  };
}

export function useHomeStats() {
  const [stats, setStats] = useState<HomeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const animalService = useAnimalService();
  const personService = usePersonService();

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const [oldestAnimal, heaviestAnimal, mostCommonSpecies, topOwner] = await Promise.all([
        animalService.getOldestAnimal(),
        animalService.getHeaviestAnimal(),
        animalService.getMostCommonSpecies(),
        personService.getTopOwner(),
      ]);

      setStats({
        totalAnimals: mostCommonSpecies.reduce(
          (acc: number, curr: AnimalSpeciesCount) => acc + curr.count,
          0
        ),
        totalOwners: topOwner.animalCount,
        oldestAnimal: {
          name: oldestAnimal.name,
          age: new Date().getFullYear() - new Date(oldestAnimal.dateOfBirth).getFullYear(),
        },
        heaviestAnimal: {
          name: heaviestAnimal.name,
          weight: heaviestAnimal.weight,
        },
        topOwner: {
          name: `${topOwner.owner.firstName} ${topOwner.owner.lastName}`,
          count: topOwner.animalCount,
        },
        mostCommonSpecies: {
          species: mostCommonSpecies[0].species,
          count: mostCommonSpecies[0].count,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch stats'));
    } finally {
      setLoading(false);
    }
  }, [animalService, personService]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}
