import { AnimalService } from '@/src/core/services/animal.service';
import { AnimalRepository } from '@/src/infrastructure/repositories/animal.repository';
import { ErrorState } from '@/components/error-state';
import { AnimalDetailView } from './animal-detail-view';

const animalService = new AnimalService(new AnimalRepository());

export default async function AnimalDetailPage({ params }: { params: { id: string } }) {
  try {
    const animal = await animalService.getAnimal(parseInt(params.id));

    if (!animal) {
      return <ErrorState message="Animal not found" />;
    }

    return <AnimalDetailView animal={animal} />;
  } catch (error) {
    console.error('Error fetching animal:', error);
    return <ErrorState message="Failed to load animal details" />;
  }
}
