import { Suspense } from "react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        Gestion d&apos;Animaux de Compagnie
      </h1>
      <Suspense fallback={<div>Chargement...</div>}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Animaux</h2>
            <p className="text-gray-600">
              Gérez tous vos animaux de compagnie
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Propriétaires</h2>
            <p className="text-gray-600">
              Consultez les informations des propriétaires
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Statistiques</h2>
            <p className="text-gray-600">
              Visualisez les données importantes
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Records</h2>
            <p className="text-gray-600">
              Découvrez les records intéressants
            </p>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
