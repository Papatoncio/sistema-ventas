import { Request, Response } from "express";
import prisma from "../database/database";
import { utils } from "../utils/utils";

class IndexController {
  // Obtener todos los usuarios
  public async select(req: Request, res: Response) {
    try {
      const token = <string>req.headers["auth"];

      const currentUser = utils.getPayload(token);

      const usuarios = await prisma.usuario.findMany({
        include: {
          tbl_usuario_rol: {
            include: {
              tbl_rol: true,
            },
          },
        },
        where: {
          cveusuario: { not: currentUser.cveusuario },
        },
        orderBy: { cveusuario: "asc" },
      });

      const resultado = usuarios.map((usuario) => ({
        ...usuario,
        roles: usuario.tbl_usuario_rol.map((ur) => ur.tbl_rol?.nombre),
      }));

      res.status(200).json({
        estado: "0",
        mensaje: "Usuarios consultados correctamente",
        objeto: resultado,
      });
    } catch (error: any) {
      return res
        .status(400)
        .json({ estado: "1", mensaje: `Error: ${error.message}` });
    }
  }

  // Insertar un nuevo usuario con roles
  public async insert(req: Request, res: Response) {
    try {
      const { nombre, apellidos, username, email, pass, roles } = req.body;

      // Verificar si el usuario ya existe basado en el email
      const existingUser = await prisma.usuario.findFirst({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        return res.status(400).json({
          estado: "1",
          mensaje: "El usuario con ese email ya existe.",
        });
      }

      const password: string = await utils.hashPassword(pass);

      // Crear el nuevo usuario
      const nuevoUsuario = await prisma.usuario.create({
        data: {
          nombre,
          apellidos,
          username,
          email,
          password,
          tbl_usuario_rol: {
            create: roles.map((cverol: number) => ({ cverol })),
          },
        },
      });

      res.status(200).json({
        estado: "0",
        mensaje: "Usuario creado correctamente",
        objeto: nuevoUsuario,
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ estado: "1", mensaje: `Error: ${error.message}` });
    }
  }

  // Actualizar un usuario existente y sus roles
  public async update(req: Request, res: Response) {
    try {
      const { id, nombre, apellidos, email, roles } = req.body;

      // Verificar si el usuario existe
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { cveusuario: parseInt(id) },
      });

      if (!usuarioExistente) {
        return res
          .status(404)
          .json({ estado: "1", mensaje: "Usuario no encontrado." });
      }

      // Actualizar el usuario y sus roles
      const usuarioActualizado = await prisma.usuario.update({
        where: { cveusuario: parseInt(id) },
        data: {
          nombre,
          apellidos,
          email,
          tbl_usuario_rol: {
            deleteMany: {}, // Eliminar todos los roles existentes
            create: roles.map((cverol: number) => ({ cverol })), // Crear nuevos roles
          },
        },
      });

      res.status(200).json({
        estado: "0",
        mensaje: "Usuario actualizado correctamente",
        objeto: usuarioActualizado,
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ estado: "1", mensaje: `Error: ${error.message}` });
    }
  }

  // Eliminar un usuario
  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.body;

      // Verificar si el usuario existe
      const existingUser = await prisma.usuario.findUnique({
        where: { cveusuario: parseInt(id) },
      });

      if (!existingUser) {
        return res
          .status(400)
          .json({ estado: "1", mensaje: "Usuario no encontrado." });
      }

      await prisma.tbl_usuario_rol.deleteMany({
        where: { cveusuario: parseInt(id) },
      });

      await prisma.usuario.delete({
        where: { cveusuario: parseInt(id) },
      });
      res.status(200).json({
        estado: "0",
        mensaje: "Usuario eliminado correctamente",
      });
    } catch (error: any) {
      return res
        .status(400)
        .json({ estado: "1", mensaje: `Error: ${error.message}` });
    }
  }
}

export const indexController = new IndexController();
