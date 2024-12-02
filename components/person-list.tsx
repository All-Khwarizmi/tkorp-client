"use client";

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

const speciesTranslations: Record<string, string> = {
  Dog: "Chien",
  Cat: "Chat",
  Bird: "Oiseau",
  Rabbit: "Lapin",
  Hamster: "Hamster",
  Turtle: "Tortue",
  Fish: "Poisson",
};

const gramsToKg = (grams: number): number => grams / 1000;

const PersonList = ({ filters }: PersonListProps) => {
  const { data, loading, error } = useQuery<PersonsData>(PERSONS_QUERY, {
    variables: {
      page: 1,
      take: 100,
    },
  });

  if (loading) return <LoadingSkeleton />;
  if (error)
    return <div>Une erreur est survenue lors du chargement des données.</div>;
  if (!data?.persons.items.length) return <div>Aucun propriétaire trouvé.</div>;

  const filteredPersons = data.persons.items.filter((person) => {
    let matches = true;

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      matches =
        matches &&
        (person.firstName.toLowerCase().includes(searchTerm) ||
          person.lastName.toLowerCase().includes(searchTerm) ||
          person.email.toLowerCase().includes(searchTerm));
    }

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
      matches =
        matches &&
        person.animals.some(
          (animal) =>
            animal.species.toLowerCase() === filters.animalType?.toLowerCase()
        );
    }

    return matches;
  });

  if (filters.sort) {
    const [field, direction] = filters.sort.split("_");
    filteredPersons.sort((a, b) => {
      let comparison = 0;
      if (field === "name") {
        comparison = `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`
        );
      } else if (field === "animals") {
        comparison = a.animals.length - b.animals.length;
      }
      return direction === "asc" ? comparison : -comparison;
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPersons.map((person) => (
        <Card
          key={person.id}
          className="overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full mr-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">
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
                    <div key={animal.id} className="relative group">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: animal.color
                            ? `#${animal.color}20`
                            : "#f3f4f6",
                          color: animal.color ? `#${animal.color}` : "#6b7280",
                        }}
                      >
                        <span className="text-xs font-medium">
                          {animal.name.charAt(0)}
                        </span>
                      </div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        <p>{animal.name}</p>
                        <p>
                          {speciesTranslations[animal.species] ||
                            animal.species}
                        </p>
                        <p>
                          {gramsToKg(animal.weight).toLocaleString("fr-FR", {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                          })}{" "}
                          kg
                        </p>
                      </div>
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
};

export default PersonList;
