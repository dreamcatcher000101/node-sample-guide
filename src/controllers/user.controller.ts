// node_modules
import { Request, Response } from "express";

// create new user
export const createUser = async (req: Request, res: Response) => {
  res.status(200).json({ description: "Hello! This is backend server!" });
};

// read users with filters
export const readUsers = async (req: Request, res: Response) => {
  res.status(200).json({ description: "Hello! This is backend server!" });
};

// update user
export const updateUser = async (req: Request, res: Response) => {
  res.status(200).json({ description: "Hello! This is backend server!" });
};

// delete user
export const deleteUser = async (req: Request, res: Response) => {
  res.status(200).json({ description: "Hello! This is backend server!" });
};

// read certain user
export const readCertainUser = async (req: Request, res: Response) => {
  res.status(200).json({ description: "Hello! This is backend server!" });
};
