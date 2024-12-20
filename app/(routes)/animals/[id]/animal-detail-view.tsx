'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';
import type { Animal } from '@/src/core/entities/types';
import { getAnimalImage, getPersonImage } from '@/lib/utils';
import { AnimalUtils } from '@/src/core/utils/animal.utils';

interface AnimalDetailViewProps {
  animal: Animal;
}

export function AnimalDetailView({ animal }: AnimalDetailViewProps) {
  const age = AnimalUtils.getAnimalAge(animal.dateOfBirth);
  const formattedWeight = AnimalUtils.formatWeight(animal.weight);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <div className="aspect-w-16 aspect-h-9 relative h-64">
            <Image
              src={getAnimalImage(animal.species, animal.id)}
              alt={animal.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl">{animal.name}</CardTitle>
              <Badge variant="secondary" className="text-lg">
                {animal.species}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Informations générales</h3>
                  <dl className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Âge</dt>
                      <dd className="font-medium">{age} ans</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Poids</dt>
                      <dd className="font-medium">{formattedWeight}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Race</dt>
                      <dd className="font-medium">{animal.breed}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Couleur</dt>
                      <dd className="font-medium">{animal.color}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Date de naissance</dt>
                      <dd className="font-medium">
                        {new Date(animal.dateOfBirth).toLocaleDateString('fr-FR')}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500">Propriétaire</h3>
                <div className="flex items-center mb-4">
                  <Image
                    src={getPersonImage(animal.owner.id)}
                    alt={`${animal.owner.firstName} ${animal.owner.lastName}`}
                    width={64}
                    height={64}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">
                      {animal.owner.firstName} {animal.owner.lastName}
                    </h4>
                    <Link
                      href={`/persons/${animal.owner.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Voir le profil
                    </Link>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    {animal.owner.email}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="mr-2 h-4 w-4" />
                    {animal.owner.phoneNumber}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
