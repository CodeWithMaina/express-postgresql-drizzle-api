import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { cityTable, TCityInsert, TCitySelect } from "../drizzle/schema";
 
 
//CRUD Operations for City 
 
//Get all citys
export const getCitysServices = async (): Promise<TCitySelect[] | null> => {
    return await db.query.cityTable.findMany({});
}

// Get all city with their states data
export const getAllCitiesWithTheirStatesService = async () => {
    const citiesWithStates = await db.query.cityTable.findMany({
        with: {
            state: true,
        },
    })
    return citiesWithStates;
}

//Get one city with its State
export const getACityWithItsStateService = async (cityId: number) => {
    const aCityWithAState = await db.query.cityTable.findFirst({
        where: eq(cityTable.cityId, cityId),
        with: {
            state: true
        },
    });
    return aCityWithAState;
} 
//Get city by ID
export const getCityByIdServices = async (cityId: number): Promise<TCitySelect | undefined> => {
    return await db.query.cityTable.findFirst({
        where: eq(cityTable.cityId, cityId)
    })
}
 
// Create a new city
export const createCityServices = async (city: TCityInsert): Promise<string> => {
    await db.insert(cityTable).values(city).returning();
    return "city created successfully 🎉";
}
 
// Update an existing city
export const updateCityServices = async (cityId: number, city: Partial<TCityInsert>): Promise<string> => {
    await db.update(cityTable).set(city).where(eq(cityTable.cityId, cityId));
    return "city updated successfully 😎";
}
 
 
// Delete a city
 
export const deleteCityServices = async (cityId: number): Promise<string> => {
    await db.delete(cityTable).where(eq(cityTable.cityId, cityId));
    return "City deleted successfully 🎉"
}