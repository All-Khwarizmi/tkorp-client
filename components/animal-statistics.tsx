"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// This should be replaced with actual data fetching logic
const data = [
  {
    name: "Poids moyen de l'espèce",
    total: 20,
  },
  {
    name: "Poids de l'animal",
    total: 25,
  },
];

export default function AnimalStatistics({ animalId }: { animalId: string }) {
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
              tickFormatter={(value) => `${value} kg`}
            />
            <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
