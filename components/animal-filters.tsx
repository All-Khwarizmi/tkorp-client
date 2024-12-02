"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface AnimalFilters {
  search?: string;
  species?: string;
  ageRange?: string;
  weightRange?: string;
  sort?: string;
}

interface AnimalFiltersProps {
  onFilterChange: (filters: AnimalFilters) => void;
}

export default function AnimalFilters({ onFilterChange }: AnimalFiltersProps) {
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [weightRange, setWeightRange] = useState("");
  const [sort, setSort] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      search: search.trim(),
      species: species || undefined,
      ageRange: ageRange || undefined,
      weightRange: weightRange || undefined,
      sort: sort || undefined,
    });
  };

  const handleReset = () => {
    setSearch("");
    setSpecies("");
    setAgeRange("");
    setWeightRange("");
    setSort("");
    onFilterChange({});
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
      <div className="flex flex-wrap gap-4">
        <Input
          type="text"
          placeholder="Rechercher un animal..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow"
        />
        <Select value={species} onValueChange={setSpecies}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Espèce" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="chien">Chien</SelectItem>
            <SelectItem value="chat">Chat</SelectItem>
            <SelectItem value="oiseau">Oiseau</SelectItem>
            <SelectItem value="lapin">Lapin</SelectItem>
            <SelectItem value="hamster">Hamster</SelectItem>
          </SelectContent>
        </Select>
        <Select value={ageRange} onValueChange={setAgeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Âge" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-2">0-2 ans</SelectItem>
            <SelectItem value="3-5">3-5 ans</SelectItem>
            <SelectItem value="6-10">6-10 ans</SelectItem>
            <SelectItem value="11+">11+ ans</SelectItem>
          </SelectContent>
        </Select>
        <Select value={weightRange} onValueChange={setWeightRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Poids" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-5000">0-5 kg</SelectItem>
            <SelectItem value="5001-10000">5-10 kg</SelectItem>
            <SelectItem value="10001-20000">10-20 kg</SelectItem>
            <SelectItem value="20001-30000">20-30 kg</SelectItem>
            <SelectItem value="30001+">30+ kg</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name_asc">Nom (A-Z)</SelectItem>
            <SelectItem value="name_desc">Nom (Z-A)</SelectItem>
            <SelectItem value="dateOfBirth_asc">Âge (Croissant)</SelectItem>
            <SelectItem value="dateOfBirth_desc">Âge (Décroissant)</SelectItem>
            <SelectItem value="weight_asc">Poids (Croissant)</SelectItem>
            <SelectItem value="weight_desc">Poids (Décroissant)</SelectItem>
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
