'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from 'components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { Button } from 'components/ui/button';
import { Mail, Phone } from 'lucide-react';
import { PersonService } from '@/src/core/services/person.service';
import { PersonRepository } from '@/src/infrastructure/repositories/person.repository';
import { LoadingSkeleton } from 'components/loading-skeleton';
import { ErrorState } from 'components/error-state';
import type { Person } from '@/src/core/entities/types';
import { getPersonImage, getAnimalImage } from '@/lib/utils';

const personService = new PersonService(new PersonRepository());

export default function PersonDetailPage({ params }: { params: { id: string } }) {
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        setLoading(true);
        const data = await personService.getPerson(parseInt(params.id));
        setPerson(data);
        setError(null);
      } catch (err) {
        setError('Failed to load person details');
        console.error('Error fetching person:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [params.id]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!person) {
    return <ErrorState message="Person not found" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <div className="aspect-w-16 aspect-h-9 relative h-64">
            <Image
              src={getPersonImage(person.id)}
              alt={`${person.firstName} ${person.lastName}`}
              fill
              className="object-cover"
              priority
            />
          </div>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div>
                <CardTitle className="text-3xl">
                  {person.firstName} {person.lastName}
                </CardTitle>
                <div className="mt-2 space-x-2">
                  <Button variant="outline" className="inline-flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    {person.email}
                  </Button>
                  <Button variant="outline" className="inline-flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    {person.phoneNumber}
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Animaux ({person.animals.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {person.animals.map((animal) => (
                  <Link key={animal.id} href={`/animals/${animal.id}`}>
                    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer">
                      <div className="aspect-w-16 aspect-h-9 relative h-48">
                        <Image
                          src={getAnimalImage(animal.species, animal.id)}
                          alt={animal.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-semibold hover:text-blue-500">
                            {animal.name}
                          </h4>
                          <Badge variant="secondary">{animal.species}</Badge>
                        </div>
                        <dl className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <dt className="text-gray-500">Race</dt>
                            <dd className="font-medium">{animal.breed}</dd>
                          </div>
                          <div>
                            <dt className="text-gray-500">Couleur</dt>
                            <dd className="font-medium">{animal.color}</dd>
                          </div>
                        </dl>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
