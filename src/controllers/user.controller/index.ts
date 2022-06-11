import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  res.status(200).json({ description: "Hello! This is backend server!" });
};

export const readUsers = async (req: Request, res: Response) => {
  res.status(200).json({ description: "Hello! This is backend server!" });
};

export const updateUser = async (req: Request, res: Response) => {
  res.status(200).json({ description: "Hello! This is backend server!" });
};

export const deleteUser = async (req: Request, res: Response) => {
  res.status(200).json({ description: "Hello! This is backend server!" });
};

export const readCertainUser = async (req: Request, res: Response) => {
  res.status(200).json({ description: "Hello! This is backend server!" });
};
