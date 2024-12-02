'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface PersonFilters {
  search?: string;
  animalCount?: string;
  animalType?: string;
  sort?: string;
}

interface PersonFiltersProps {
  onFilterChange: (filters: PersonFilters) => void;
}

export default function PersonFilters({ onFilterChange }: PersonFiltersProps) {
  const [search, setSearch] = useState('');
  const [animalCount, setAnimalCount] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [sort, setSort] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      search: search.trim(),
      animalCount: animalCount || undefined,
      animalType: animalType || undefined,
      sort: sort || undefined,
    });
  };

  const handleReset = () => {
    setSearch('');
    setAnimalCount('');
    setAnimalType('');
    setSort('');
    onFilterChange({});
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
      <div className="flex flex-wrap gap-4">
        <Input
          type="text"
          placeholder="Rechercher un propriétaire..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow"
        />
        <Select value={animalCount} onValueChange={setAnimalCount}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Nombre d'animaux" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 animal</SelectItem>
            <SelectItem value="2-3">2-3 animaux</SelectItem>
            <SelectItem value="4-5">4-5 animaux</SelectItem>
            <SelectItem value="6+">6+ animaux</SelectItem>
          </SelectContent>
        </Select>
        <Select value={animalType} onValueChange={setAnimalType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type d'animal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="chien">Chien</SelectItem>
            <SelectItem value="chat">Chat</SelectItem>
            <SelectItem value="oiseau">Oiseau</SelectItem>
            <SelectItem value="lapin">Lapin</SelectItem>
            <SelectItem value="hamster">Hamster</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name_asc">Nom (A-Z)</SelectItem>
            <SelectItem value="name_desc">Nom (Z-A)</SelectItem>
            <SelectItem value="animals_asc">Nombre d&apos;animaux (Croissant)</SelectItem>
            <SelectItem value="animals_desc">Nombre d&apos;animaux (Décroissant)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-4">
        <Button type="submit" variant="default">
          Appliquer les filtres
        </Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          Réinitialiser
        </Button>
      </div>
    </form>
  );
}
