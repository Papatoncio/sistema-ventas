"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const database_1 = __importDefault(require("../database/database"));
const utils_1 = require("../utils/utils");
class IndexController {
    // Obtener todos los usuarios
    select(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["auth"];
                const currentUser = utils_1.utils.getPayload(token);
                const usuarios = yield database_1.default.usuario.findMany({
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
                const resultado = usuarios.map((usuario) => (Object.assign(Object.assign({}, usuario), { roles: usuario.tbl_usuario_rol.map((ur) => { var _a; return (_a = ur.tbl_rol) === null || _a === void 0 ? void 0 : _a.nombre; }) })));
                res.status(200).json({
                    estado: "0",
                    mensaje: "Usuarios consultados correctamente",
                    objeto: resultado,
                });
            }
            catch (error) {
                return res
                    .status(400)
                    .json({ estado: "1", mensaje: `Error: ${error.message}` });
            }
        });
    }
    // Insertar un nuevo usuario con roles
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, apellidos, username, email, pass, roles } = req.body;
                // Verificar si el usuario ya existe basado en el email
                const existingUser = yield database_1.default.usuario.findFirst({
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
                const password = yield utils_1.utils.hashPassword(pass);
                // Crear el nuevo usuario
                const nuevoUsuario = yield database_1.default.usuario.create({
                    data: {
                        nombre,
                        apellidos,
                        username,
                        email,
                        password,
                        tbl_usuario_rol: {
                            create: roles.map((cverol) => ({ cverol })),
                        },
                    },
                });
                res.status(200).json({
                    estado: "0",
                    mensaje: "Usuario creado correctamente",
                    objeto: nuevoUsuario,
                });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ estado: "1", mensaje: `Error: ${error.message}` });
            }
        });
    }
    // Actualizar un usuario existente y sus roles
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, nombre, apellidos, email, roles } = req.body;
                // Verificar si el usuario existe
                const usuarioExistente = yield database_1.default.usuario.findUnique({
                    where: { cveusuario: parseInt(id) },
                });
                if (!usuarioExistente) {
                    return res
                        .status(404)
                        .json({ estado: "1", mensaje: "Usuario no encontrado." });
                }
                // Actualizar el usuario y sus roles
                const usuarioActualizado = yield database_1.default.usuario.update({
                    where: { cveusuario: parseInt(id) },
                    data: {
                        nombre,
                        apellidos,
                        email,
                        tbl_usuario_rol: {
                            deleteMany: {}, // Eliminar todos los roles existentes
                            create: roles.map((cverol) => ({ cverol })), // Crear nuevos roles
                        },
                    },
                });
                res.status(200).json({
                    estado: "0",
                    mensaje: "Usuario actualizado correctamente",
                    objeto: usuarioActualizado,
                });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ estado: "1", mensaje: `Error: ${error.message}` });
            }
        });
    }
    // Eliminar un usuario
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                // Verificar si el usuario existe
                const existingUser = yield database_1.default.usuario.findUnique({
                    where: { cveusuario: parseInt(id) },
                });
                if (!existingUser) {
                    return res
                        .status(400)
                        .json({ estado: "1", mensaje: "Usuario no encontrado." });
                }
                yield database_1.default.tbl_usuario_rol.deleteMany({
                    where: { cveusuario: parseInt(id) },
                });
                yield database_1.default.usuario.delete({
                    where: { cveusuario: parseInt(id) },
                });
                res.status(200).json({
                    estado: "0",
                    mensaje: "Usuario eliminado correctamente",
                });
            }
            catch (error) {
                return res
                    .status(400)
                    .json({ estado: "1", mensaje: `Error: ${error.message}` });
            }
        });
    }
}
exports.indexController = new IndexController();
