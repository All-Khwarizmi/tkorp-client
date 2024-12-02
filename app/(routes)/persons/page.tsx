"use client";

import { Suspense, useState } from "react";
import PersonFilters from "@/components/person-filters";
import { Skeleton } from "@/components/ui/skeleton";
import PersonList from "@/components/person-list";
import type { PersonFilters as PersonFiltersType } from "@/components/person-filters";

export default function PersonsPage() {
  const [filters, setFilters] = useState<PersonFiltersType>({});

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Liste des Propriétaires</h1>
      <PersonFilters onFilterChange={setFilters} />
      <Suspense fallback={<PersonListSkeleton />}>
        <PersonList filters={filters} />
      </Suspense>
    </div>
  );
}

function PersonListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center mb-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="ml-4">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  );
}
