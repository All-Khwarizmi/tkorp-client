import { FileQuestion } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <Card className="text-center p-6">
      <CardContent>
        <FileQuestion className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-lg font-semibold text-gray-900">{message}</p>
        {actionLabel && onAction && (
          <Button onClick={onAction} className="mt-4">
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
