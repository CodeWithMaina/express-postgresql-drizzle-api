import { Router } from "express";
import { createState, deleteState, getStateById, getStates, updateState } from "./state.controller";
 
export const stateRouter = Router();
 
// State routes definition
 
 
// Get all users
stateRouter.get('/states', getStates);
 
// Get user by ID
stateRouter.get('/states/:id', getStateById);
 
// Create a new user
stateRouter.post('/states', createState);
 
// Update an existing user
stateRouter.put('/states/:id',updateState);
 
 
// Delete an existing user
stateRouter.delete('/states/:id', deleteState);