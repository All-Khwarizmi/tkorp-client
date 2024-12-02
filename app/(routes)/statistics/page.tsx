import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TopRecords from "@/components/top-records";
import SpeciesDistribution from "@/components/species-distribution";
import AgeDistribution from "@/components/age-distribution";
import WeightDistribution from "@/components/weight-distribution";
import OverviewStats from "@/components/overview-stats";

export default function StatisticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Statistiques</h1>

      <div className="grid gap-8">
        <Suspense fallback={<Skeleton className="h-[200px]" />}>
          <OverviewStats />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[300px]" />}>
          <TopRecords />
        </Suspense>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Distribution des Espèces</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[300px]" />}>
                <SpeciesDistribution />
              </Suspense>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribution des Âges</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[300px]" />}>
                <AgeDistribution />
              </Suspense>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Distribution des Poids par Espèce</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[400px]" />}>
                <WeightDistribution />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
