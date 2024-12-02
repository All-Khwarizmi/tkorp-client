import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface Animal {
  id: number;
  name: string;
  species: string;
  owner: string;
  image: string;
}

interface AnimalCardProps {
  animal: Animal;
}

export function AnimalCard({ animal }: AnimalCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="aspect-w-16 aspect-h-9 relative h-48">
        <Image
          src={animal.image}
          alt={animal.name}
          fill
          className="object-cover transition-all duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1">{animal.name}</h3>
        <p className="text-sm text-gray-600">{animal.species}</p>
        <p className="text-sm text-gray-500">Propriétaire: {animal.owner}</p>
      </CardContent>
    </Card>
  );
}
