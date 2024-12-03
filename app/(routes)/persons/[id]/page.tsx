import { PersonService } from '@/src/core/services/person.service';
import { PersonRepository } from '@/src/infrastructure/repositories/person.repository';
import { ErrorState } from '@/components/error-state';
import { PersonDetailView } from './person-detail-view';

const personService = new PersonService(new PersonRepository());

export default async function PersonDetailPage({ params }: { params: { id: string } }) {
  try {
    const person = await personService.getPerson(parseInt(params.id));

    if (!person) {
      return <ErrorState message="Person not found" />;
    }

    return <PersonDetailView person={person} />;
  } catch (error) {
    console.error('Error fetching person:', error);
    return <ErrorState message="Failed to load person details" />;
  }
}
