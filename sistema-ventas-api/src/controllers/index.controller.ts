import { Request, Response } from "express";
import prisma from "../database/database";
import { utils } from "../utils/utils";

class IndexController {
  public async index(req: Request, res: Response) {
    try {
      const user = {
        nombre: "Juan Pablo",
        apellidos: "Jiménez Jaime",
        username: "jpjj123",
        password: "linux",
      };

      const token = utils.generateJWT(user);
      console.log(token);
      res.json({ message: token });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error}` });
    }
  }

  public insert(req: Request, res: Response) {
    try {
      return res.json({ message: "Insert Works" });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error}` });
    }
  }

  public update(req: Request, res: Response) {
    try {
      return res.json({ message: "Update Works" });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error}` });
    }
  }

  public delete(req: Request, res: Response) {
    try {
      return res.json({ message: "Delete Works" });
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error}` });
    }
  }
}

export const indexController = new IndexController();
