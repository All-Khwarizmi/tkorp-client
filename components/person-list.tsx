"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { useQuery } from "@apollo/client";
import { PERSONS_QUERY } from "@/src/infrastructure/graphql/queries";
import { LoadingSkeleton } from "./loading-skeleton";
import type { PersonFilters } from "./person-filters";
import type { Person } from "@/src/core/entities/types";

interface PersonListProps {
  filters: PersonFilters;
}

interface PersonsData {
  persons: {
    items: Person[];
    total: number;
    hasMore: boolean;
  };
}

export default function PersonList({ filters }: PersonListProps) {
  const { data, loading, error } = useQuery<PersonsData>(PERSONS_QUERY, {
    variables: {
      page: 1,
      take: 100,
      ...(filters.search && { search: filters.search }),
      ...(filters.sort && {
        orderBy: {
          field: filters.sort.split('_')[0],
          direction: filters.sort.split('_')[1].toUpperCase()
        }
      })
    }
  });

  if (loading) return <LoadingSkeleton />;
  if (error) return <div>Une erreur est survenue lors du chargement des données.</div>;
  if (!data?.persons.items.length) return <div>Aucun propriétaire trouvé.</div>;

  // Filter persons based on animalCount and animalType
  const filteredPersons = data.persons.items.filter(person => {
    let matches = true;

    if (filters.animalCount) {
      const count = person.animals.length;
      switch (filters.animalCount) {
        case "1":
          matches = matches && count === 1;
          break;
        case "2-3":
          matches = matches && count >= 2 && count <= 3;
          break;
        case "4-5":
          matches = matches && count >= 4 && count <= 5;
          break;
        case "6+":
          matches = matches && count >= 6;
          break;
      }
    }

    if (filters.animalType) {
      matches = matches && person.animals.some(
        animal => animal.species.toLowerCase() === filters.animalType?.toLowerCase()
      );
    }

    return matches;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPersons.map((person) => (
        <Card
          key={person.id}
          className="overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-500">
                  {person.firstName.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {person.firstName} {person.lastName}
                </h3>
                <p className="text-sm text-gray-600">
                  {person.animals.length} animaux
                </p>
              </div>
            </div>
            {person.animals.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Animaux:</h4>
                <div className="flex flex-wrap gap-2">
                  {person.animals.map((animal) => (
                    <div
                      key={animal.id}
                      className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center"
                      title={`${animal.name} (${animal.species})`}
                    >
                      <span className="text-xs font-medium">
                        {animal.name.charAt(0)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Mail className="mr-2 h-4 w-4" />
                {person.email}
              </Button>
              {person.phoneNumber && (
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="mr-2 h-4 w-4" />
                  {person.phoneNumber}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
