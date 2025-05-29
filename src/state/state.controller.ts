import { Request, Response } from "express";
import { createStateServices, deleteStateServices, getStateByIdServices, getStatesServices, updateStateServices } from "./state.service";
 
//Business logic for state-related operations
 
 
export const getStates = async (req: Request, res: Response) => {
    try {
        const allStates = await getStatesServices();
        if (allStates == null || allStates.length == 0) {
          res.status(404).json({ message: "No States found" });
        }else{
            res.status(200).json(allStates);            
        }            
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch States" });
    }
}
 
export const getStateById = async (req: Request, res: Response) => {
    const stateId = parseInt(req.params.id);
    if (isNaN(stateId)) {
        res.status(400).json({ error: "Invalid State ID" });
         return; // Prevent further execution
    }
    try {
        const state = await getStateByIdServices(stateId);
        if (state == null) {
            res.status(404).json({ message: "State not found" });
        } else {
            res.status(200).json(state);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch state" });
    }
}
 
export const createState = async (req: Request, res: Response) => {
    const { stateName, stateCode} = req.body;
    if (!stateName || !stateCode) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try {
        const newState = await createStateServices({ stateName, stateCode});
        if (newState == null) {
            res.status(500).json({ message: "Failed to create State" });
        } else {
            res.status(201).json({message:newState});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to create State" });
    }
}
 
export const updateState = async (req: Request, res: Response) => {
    const stateId = parseInt(req.params.id);
    if (isNaN(stateId)) {
        res.status(400).json({ error: "Invalid state ID" });
        return; // Prevent further execution
    }
    const { stateName, stateCode } = req.body;
    if (!stateName || !stateCode ) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try {
        const updatedState = await updateStateServices(stateId, { stateName, stateCode });
        if (updatedState == null) {
            res.status(404).json({ message: "User not found or failed to update" });
        } else {
            res.status(200).json({message:updatedState});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update user" });
    }
}
 
 
export const deleteState = async (req: Request, res: Response) => {
    const stateId = parseInt(req.params.id);  
    if (isNaN(stateId)) {
        res.status(400).json({ error: "Invalid state ID" });
        return; // Prevent further execution
    }
    try {
        const existingState = await getStateByIdServices(stateId)
 
        if(!existingState){
            res.status(200).json({message: "State does not exit"})
            return;
        }
        const deleteState = await deleteStateServices(stateId);
        if (deleteState) {
            res.status(200).json({message:deleteState});
        } else {
            res.status(404).json({ message: "State not found" });
        }
    } catch (error:any) {    
        res.status(500).json({ error:error.message || "Failed to delete state" });
    }    
}