'use client'

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { useStatistics } from "../hooks/use-statistics"
import { LoadingSkeleton } from "./loading-skeleton"

function calculateAge(dateOfBirth: string): number {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

// Convert weight from grams to kilograms
const gramsToKg = (grams: number): number => grams / 1000;

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('fr-FR').format(num);
};

export default function TopRecords() {
  const { 
    heaviestAnimal, 
    oldestAnimal, 
    topOwner, 
    ownerWithHeaviestPets,
    isLoading 
  } = useStatistics();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {heaviestAnimal && (
        <Card>
          <CardHeader>
            <CardTitle>Animal le plus lourd</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold">{heaviestAnimal.name}</p>
              <p>Espèce: {heaviestAnimal.species}</p>
              <p>Race: {heaviestAnimal.breed}</p>
              <p>Poids: {formatNumber(gramsToKg(heaviestAnimal.weight))} kg</p>
              <p className="text-sm text-gray-500">
                Propriétaire: {heaviestAnimal.owner.firstName} {heaviestAnimal.owner.lastName}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {oldestAnimal && (
        <Card>
          <CardHeader>
            <CardTitle>Animal le plus âgé</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold">{oldestAnimal.name}</p>
              <p>Espèce: {oldestAnimal.species}</p>
              <p>Race: {oldestAnimal.breed}</p>
              <p>Âge: {formatNumber(calculateAge(oldestAnimal.dateOfBirth))} ans</p>
              <p className="text-sm text-gray-500">
                Propriétaire: {oldestAnimal.owner.firstName} {oldestAnimal.owner.lastName}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {topOwner && (
        <Card>
          <CardHeader>
            <CardTitle>Plus grand propriétaire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold">
                {topOwner.owner.firstName} {topOwner.owner.lastName}
              </p>
              <p>Email: {topOwner.owner.email}</p>
              <p>Nombre d'animaux: {formatNumber(topOwner.animalCount)}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {ownerWithHeaviestPets && (
        <Card>
          <CardHeader>
            <CardTitle>Propriétaire avec le plus de poids total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold">
                {ownerWithHeaviestPets.owner.firstName} {ownerWithHeaviestPets.owner.lastName}
              </p>
              <p>Email: {ownerWithHeaviestPets.owner.email}</p>
              <p>Nombre d'animaux: {formatNumber(ownerWithHeaviestPets.animalCount)}</p>
              <p>Poids total: {formatNumber(gramsToKg(ownerWithHeaviestPets.totalWeight))} kg</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
