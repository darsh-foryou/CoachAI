"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function ColdEmailResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const coldEmail = searchParams.get("coldEmail") || "";

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Generated Cold Email</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded whitespace-pre-wrap">{coldEmail}</div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => router.push("/cold-email")}>
            Back to Generator
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
