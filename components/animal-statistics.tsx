'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { AnimalService } from '@/src/core/services/animal.service';
import { AnimalRepository } from '@/src/infrastructure/repositories/animal.repository';

const animalService = new AnimalService(new AnimalRepository());

export default function AnimalStatistics() {
  const [data] = useState([
    {
      name: "Poids moyen de l'espèce",
      total: 0,
    },
    {
      name: "Poids de l'animal",
      total: 0,
    },
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparaison de poids</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => animalService.formatWeight(value)}
            />
            <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
