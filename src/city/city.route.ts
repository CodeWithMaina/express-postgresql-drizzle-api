import { Router } from "express";
import { createCity, deleteCity, getACityWithAState, getAllCitiesWithAllStates, getCities, getCityById, updateCity } from "./city.contoller";
 
export const cityRouter = Router();
 
// User routes definition
 
 
// Get all cities
cityRouter.get('/city', getCities);

//Get all cities with their states
cityRouter.get('/CitiesWithStates', getAllCitiesWithAllStates);

//Get a city with its state
cityRouter.get('/citystate/:id', getACityWithAState)
 
// Get city by ID
cityRouter.get('/city/:id', getCityById);
 
// Create a new city
cityRouter.post('/city', createCity);
 
// Update an existing city
cityRouter.put('/city/:id',updateCity);
 
 
// Delete an existing city
cityRouter.delete('/city/:id', deleteCity);