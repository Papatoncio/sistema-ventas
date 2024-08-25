import { Request, Response } from "express";
import prisma from "../database/database";

class RolController {
  public async getRoles(req: Request, res: Response) {
    try {
      const rolesUso = await prisma.tbl_rol.findMany({
        orderBy: { nombre: "asc" },
      });

      console.log(rolesUso);
      return res.status(200).json(rolesUso);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }
}

export const rolController = new RolController();
