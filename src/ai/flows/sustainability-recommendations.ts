'use server';

/**
 * @fileOverview AI agent that suggests film equipment pairings to minimize power consumption and environmental impact.
 *
 * - getSustainabilityRecommendations - A function that handles the equipment pairing recommendation process.
 * - SustainabilityRecommendationsInput - The input type for the getSustainabilityRecommendations function.
 * - SustainabilityRecommendationsOutput - The return type for the getSustainabilityRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SustainabilityRecommendationsInputSchema = z.object({
  equipmentList: z.array(
    z.object({
      name: z.string().describe('Name of the equipment item.'),
      category: z.string().describe('Category of the equipment (e.g., Camera, Lighting, Audio).'),
      powerConsumption: z.number().describe('Power consumption in watts.'),
      sustainabilityRating: z.number().describe('A rating from 1 to 5 indicating the sustainability of the equipment (5 being the most sustainable).'),
    })
  ).describe('A list of film equipment with their details.'),
  shootType: z.string().describe('The type of film shoot (e.g., indoor studio, outdoor location).'),
  shootDuration: z.number().describe('The estimated duration of the film shoot in hours.'),
});
export type SustainabilityRecommendationsInput = z.infer<typeof SustainabilityRecommendationsInputSchema>;

const SustainabilityRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      equipmentPairing: z.string().describe('Recommended pairing of equipment items.'),
      reasoning: z.string().describe('Explanation of why this pairing is sustainable.'),
      estimatedPowerSavings: z.number().describe('Estimated power savings in watts for this pairing.'),
      environmentalImpactScore: z.number().describe('A score indicating the overall environmental impact of this pairing (lower is better).'),
    })
  ).describe('A list of sustainable equipment pairing recommendations.'),
  overallSustainabilityTips: z.string().describe('General tips for maintaining sustainability during the film shoot.'),
});
export type SustainabilityRecommendationsOutput = z.infer<typeof SustainabilityRecommendationsOutputSchema>;

export async function getSustainabilityRecommendations(input: SustainabilityRecommendationsInput): Promise<SustainabilityRecommendationsOutput> {
  return sustainabilityRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'sustainabilityRecommendationsPrompt',
  input: {schema: SustainabilityRecommendationsInputSchema},
  output: {schema: SustainabilityRecommendationsOutputSchema},
  prompt: `You are an AI assistant providing sustainability recommendations for film equipment pairings.

  Given the following list of equipment, the type of shoot, and the shoot duration, provide a list of equipment pairing recommendations that minimize power consumption and environmental impact.

  Equipment List:
  {{#each equipmentList}}
  - Name: {{name}}, Category: {{category}}, Power Consumption: {{powerConsumption}}W, Sustainability Rating: {{sustainabilityRating}}
  {{/each}}

  Shoot Type: {{shootType}}
  Shoot Duration: {{shootDuration}} hours

  Provide the recommendations in the following format:
  Recommendations:
  [
    {
      equipmentPairing: "[Equipment Pairing Name]",
      reasoning: "[Explanation of why this pairing is sustainable]",
      estimatedPowerSavings: [Estimated power savings in watts for this pairing],
      environmentalImpactScore: [A score indicating the overall environmental impact of this pairing (lower is better)]
    }
  ]

  Also, provide overall sustainability tips for the film shoot.
  Overall Sustainability Tips: [Tips for maintaining sustainability during the film shoot]
  `,
});

const sustainabilityRecommendationsFlow = ai.defineFlow(
  {
    name: 'sustainabilityRecommendationsFlow',
    inputSchema: SustainabilityRecommendationsInputSchema,
    outputSchema: SustainabilityRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
