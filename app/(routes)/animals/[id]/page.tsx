import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import AnimalStatistics from "@/components/animal-statistics";

// This should be replaced with actual data fetching logic
const animal = {
  id: 1,
  name: "Max",
  species: "Chien",
  breed: "Labrador",
  age: 5,
  weight: 25,
  birthDate: "2018-05-15",
  color: "Golden",
  image: "/placeholder.svg",
  owner: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    image: "/placeholder.svg",
  },
};

export default function AnimalDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 relative">
              <Image
                src={animal.image}
                alt={animal.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold">{animal.name}</h1>
                <Badge className="text-lg">{animal.species}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-600">Âge</p>
                  <p className="font-semibold">{animal.age} ans</p>
                </div>
                <div>
                  <p className="text-gray-600">Poids</p>
                  <p className="font-semibold">{animal.weight} kg</p>
                </div>
                <div>
                  <p className="text-gray-600">Race</p>
                  <p className="font-semibold">{animal.breed}</p>
                </div>
                <div>
                  <p className="text-gray-600">Couleur</p>
                  <p className="font-semibold">{animal.color}</p>
                </div>
                <div>
                  <p className="text-gray-600">Date de naissance</p>
                  <p className="font-semibold">{animal.birthDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Propriétaire</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <Image
                  src={animal.owner.image}
                  alt={animal.owner.name}
                  width={64}
                  height={64}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-lg">{animal.owner.name}</h3>
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
                  {animal.owner.phone}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Statistiques</h2>
        <AnimalStatistics animalId={params.id} />
      </div>
    </div>
  );
}
