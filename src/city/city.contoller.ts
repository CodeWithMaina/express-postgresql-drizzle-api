import { Request, Response } from "express";
import {
  createCityServices,
  deleteCityServices,
  getACityWithItsStateService,
  getAllCitiesWithTheirStatesService,
  getCityByIdServices,
  getCitysServices,
  updateCityServices,
} from "./city.service";

//Business logic for cities

export const getCities = async (req: Request, res: Response) => {
  try {
    const allCities = await getCitysServices();
    if (allCities == null || allCities.length == 0) {
      res.status(404).json({ message: "No cities found" });
    } else {
      res.status(200).json(allCities);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch cities" });
  }
};
///get all cities with their states
export const getAllCitiesWithAllStates = async (
  req: Request,
  res: Response
) => {
  try {
    const getCitiesWithStates = await getAllCitiesWithTheirStatesService();
    if (getCitiesWithStates == null || getCitiesWithStates.length == 0) {
      res.status(404).json({ message: "No cities found " });
    } else {
      res.status(200).json(getCitiesWithStates);
    }
  } catch (error: any) {
    res
      .status(500)
      .json({
        error: error.message || "Failed to fetch cities with their states",
      });
  }
};

//Get A city with its state
export const getACityWithAState = async (req: Request, res: Response) => {
  const cityId = parseInt(req.params.id);
  if (isNaN(cityId)) {
    res.status(400).json({ error: "Invalid city ID" });
    return;
  }
  try {
    const cityWithState = await getACityWithItsStateService(cityId);
    if(cityWithState == null){
        res.status(404).json({message: "city is not found"});
    } else {
        res.status(200).json(cityWithState);
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch specified city" });
  }
};

export const getCityById = async (req: Request, res: Response) => {
  const cityId = parseInt(req.params.id);
  if (isNaN(cityId)) {
    res.status(400).json({ error: "Invalid city ID" });
    return; // Prevent further execution
  }
  try {
    const city = await getCityByIdServices(cityId);
    if (city == null) {
      res.status(404).json({ message: "city not found" });
    } else {
      res.status(200).json(city);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch city" });
  }
};

export const createCity = async (req: Request, res: Response) => {
  const { cityName, stateId } = req.body;
  if (!cityName || !stateId) {
    res.status(400).json({ error: "All fields are required" });
    return; // Prevent further execution
  }
  try {
    const newCity = await createCityServices({ cityName, stateId });
    if (newCity == null) {
      res.status(500).json({ message: "Failed to create city" });
    } else {
      res.status(201).json({ message: newCity });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create city" });
  }
};

export const updateCity = async (req: Request, res: Response) => {
  const cityId = parseInt(req.params.id);
  if (isNaN(cityId)) {
    res.status(400).json({ error: "Invalid city ID" });
    return; // Prevent further execution
  }
  const { cityName, stateId } = req.body;
  if (!cityName || !stateId) {
    res.status(400).json({ error: "All fields are required" });
    return; // Prevent further execution
  }
  try {
    const updatedCity = await updateCityServices(cityId, { cityName, stateId });
    if (updatedCity == null) {
      res.status(404).json({ message: "City not found or failed to update" });
    } else {
      res.status(200).json({ message: updatedCity });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update city" });
  }
};

export const deleteCity = async (req: Request, res: Response) => {
  const cityId = parseInt(req.params.id);
  if (isNaN(cityId)) {
    res.status(400).json({ error: "Invalid City ID" });
    return; // Prevent further execution
  }
  const existingCity = await getCityByIdServices(cityId);
  if (!existingCity) {
    res.status(200).json({ message: "City is not found" });
    return;
  }

  try {
    const deletedUser = await deleteCityServices(cityId);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({ message: "City not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete city" });
  }
};
