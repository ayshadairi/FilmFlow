"use client";

import React, { useState, useTransition } from "react";
import { Leaf, Lightbulb, Zap, Loader2, Sparkles } from "lucide-react";
import { getSustainabilityRecommendations, SustainabilityRecommendationsOutput, SustainabilityRecommendationsInput } from "@/ai/flows/sustainability-recommendations";
import { mockEquipment } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Equipment } from "@/types";

export function SustainabilityPlanner() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [recommendations, setRecommendations] = useState<SustainabilityRecommendationsOutput | null>(null);
  const [selectedEquipmentIds, setSelectedEquipmentIds] = useState<string[]>([]);
  const [shootType, setShootType] = useState("Outdoor Location");
  const [shootDuration, setShootDuration] = useState(8);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedEquipment = mockEquipment.filter(item => selectedEquipmentIds.includes(item.id))
      .map(item => ({
        name: item.name,
        category: item.category,
        powerConsumption: item.specifications.Power ? parseInt(item.specifications.Power) : 50, // Mock power consumption
        sustainabilityRating: item.condition === 'excellent' ? 5 : (item.condition === 'good' ? 4 : 3)
      }));

    if (selectedEquipment.length < 2) {
      toast({
        title: "Not enough equipment",
        description: "Please select at least two pieces of equipment to get recommendations.",
        variant: "destructive",
      });
      return;
    }

    const input: SustainabilityRecommendationsInput = {
      equipmentList: selectedEquipment,
      shootType,
      shootDuration,
    };

    startTransition(async () => {
      setRecommendations(null);
      const result = await getSustainabilityRecommendations(input);
      if (result) {
        setRecommendations(result);
      } else {
        toast({
          title: "Error",
          description: "Could not get sustainability recommendations.",
          variant: "destructive",
        });
      }
    });
  };

  const handleEquipmentSelection = (id: string) => {
    setSelectedEquipmentIds(prev =>
      prev.includes(id) ? prev.filter(eqId => eqId !== id) : [...prev, id]
    );
  };
  
  return (
    <div className="space-y-6">
       <div>
          <h2 className="text-3xl font-bold text-foreground">Sustainability Planner</h2>
          <p className="text-muted-foreground flex items-center gap-2">
            <Leaf className="h-4 w-4 text-cna-green-500"/>
            Get AI-powered recommendations for eco-friendly equipment pairings.
          </p>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Shoot Details</CardTitle>
            <CardDescription>Configure your shoot to get tailored recommendations.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="shootType">Shoot Type</Label>
                <Input id="shootType" value={shootType} onChange={(e) => setShootType(e.target.value)} placeholder="e.g., Indoor Studio, Outdoor Location" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shootDuration">Shoot Duration (hours)</Label>
                <Input id="shootDuration" type="number" value={shootDuration} onChange={(e) => setShootDuration(parseInt(e.target.value))} placeholder="e.g., 8" />
              </div>
              <div className="space-y-2">
                <Label>Select Equipment</Label>
                <ScrollArea className="h-64 border rounded-md p-4">
                  <div className="space-y-2">
                    {mockEquipment.map((item: Equipment) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`equip-${item.id}`}
                          checked={selectedEquipmentIds.includes(item.id)}
                          onCheckedChange={() => handleEquipmentSelection(item.id)}
                        />
                        <Label htmlFor={`equip-${item.id}`} className="font-normal cursor-pointer">{item.name}</Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate Recommendations
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          {isPending && (
            <Card>
              <CardContent className="p-12 text-center space-y-4">
                 <Loader2 className="mx-auto h-12 w-12 text-primary animate-spin" />
                 <h3 className="text-lg font-semibold">Generating Recommendations...</h3>
                 <p className="text-muted-foreground">Our AI is analyzing the best eco-friendly options for your shoot.</p>
              </CardContent>
            </Card>
          )}

          {recommendations ? (
            <>
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Lightbulb className="text-yellow-500" /> Overall Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{recommendations.overallSustainabilityTips}</p>
                </CardContent>
              </Card>

              <div className="space-y-4">
              <h3 className="text-xl font-semibold">Recommended Pairings</h3>
              {recommendations.recommendations.map((rec, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{rec.equipmentPairing}</CardTitle>
                    <CardDescription>{rec.reasoning}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-green-500"/>
                      <div>
                        <p className="font-semibold">{rec.estimatedPowerSavings}W</p>
                        <p className="text-muted-foreground">Est. Power Savings</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-blue-500"/>
                      <div>
                        <p className="font-semibold">{rec.environmentalImpactScore}/10</p>
                        <p className="text-muted-foreground">Impact Score</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              </div>
            </>
          ) : !isPending && (
             <Card>
              <CardContent className="p-12 text-center space-y-4">
                 <Leaf className="mx-auto h-12 w-12 text-muted-foreground" />
                 <h3 className="text-lg font-semibold">Ready to be sustainable?</h3>
                 <p className="text-muted-foreground">Fill out your shoot details and select your equipment to get started.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
