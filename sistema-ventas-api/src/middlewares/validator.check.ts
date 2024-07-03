import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  console.log("Init Middleware :: validator.check");
  // Se obtiene los errores a partir del request original de la petición
  const errors = validationResult(req);

  // Si no existen errores la petición continua
  if (errors.isEmpty()) return next();

  // Se devuelven los errores con un estado de petición 400
  return res.status(400).json(errors.array());
};
