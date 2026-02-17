import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function TodoSkeletonCard() {
  return (
    <Card className="w-sm mx-auto">
      <CardHeader className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-full mt-4" />
      </CardContent>
    </Card>
  );
}


export default TodoSkeletonCard;