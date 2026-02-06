
import { GoogleGenAI, Type } from "@google/genai";
import { RAIGAD_POIS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartRouteSuggestions = async (origin: string, destination: string, radius: number) => {
    const poiList = RAIGAD_POIS.map(p => ({ name: p.name, type: p.type, taluka: p.taluka }));
    
    const prompt = `Act as a geographical routing expert for Raigad, Maharashtra. 
    Route: From ${origin} to ${destination}.
    Available POIs in our database: ${JSON.stringify(poiList)}.
    
    Tasks:
    1. Identify which of these POIs are logically located near the likely driving route within a ${radius}km buffer.
    2. For each selected POI, calculate:
       - 'distanceFromRoute': How many kilometers the user must drive off the main highway to reach it.
       - 'extraTime': Total additional time (detour + visit time) in a readable format (e.g., "+45 mins").
    3. Return only the top 4 most relevant stops.`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        type: { type: Type.STRING },
                        description: { type: Type.STRING },
                        distanceFromRoute: { type: Type.STRING, description: "Distance in km off the main path" },
                        extraTime: { type: Type.STRING, description: "Additional time required" }
                    },
                    required: ["name", "type", "description", "distanceFromRoute", "extraTime"]
                }
            }
        }
    });

    return JSON.parse(response.text || "[]");
};
