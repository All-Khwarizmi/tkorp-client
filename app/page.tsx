'use client';

import { Suspense } from 'react';
import { PawPrint, Weight, Crown, Users } from 'lucide-react';
import { StatCard } from '@/components/stats/stat-card';
import { useHomeStats } from '@/hooks/use-home-stats';

export default function HomePage() {
  const { stats, loading } = useHomeStats();

  if (loading || !stats) {
    return <div>Chargement...</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section
        className="relative py-20 px-4 sm:px-6 lg:px-8 text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/paw-pattern.svg')" }}
      >
        <div className="absolute inset-0 bg-white/70"></div>
        <div className="relative max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Gestion d&apos;Animaux de Compagnie
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Gérez {stats.totalAnimals} animaux et {stats.totalOwners} propriétaires avec facilité.
          </p>
        </div>
      </section>

      <Suspense fallback={<div>Chargement...</div>}>
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Statistiques Rapides
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<PawPrint className="h-6 w-6" />}
              title="Animal le plus âgé"
              value={`${stats.oldestAnimal.name}, ${stats.oldestAnimal.age} ans`}
            />
            <StatCard
              icon={<Weight className="h-6 w-6" />}
              title="Animal le plus lourd"
              value={`${stats.heaviestAnimal.name}, ${stats.heaviestAnimal.weight / 1000} kg`}
            />
            <StatCard
              icon={<Crown className="h-6 w-6" />}
              title="Top propriétaire"
              value={`${stats.topOwner.name}, ${stats.topOwner.count} animaux`}
            />
            <StatCard
              icon={<Users className="h-6 w-6" />}
              title="Espèce la plus commune"
              value={`${stats.mostCommonSpecies.species}, ${stats.mostCommonSpecies.count}`}
            />
          </div>
        </section>

        {/* Recent Additions Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Derniers Ajouts</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* À implémenter avec les données réelles */}
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-muted-foreground">
                Les derniers animaux ajoutés seront affichés ici...
              </p>
            </div>
          </div>
        </section>
      </Suspense>
    </main>
  );
}
