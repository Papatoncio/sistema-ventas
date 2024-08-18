import { Router } from "express";
import { indexController } from "../controllers/index.controller";
import { validate } from "../middlewares/validator.check";
import { insertRules, updateRules } from "../rules/index.rules";
import { jwtCheck } from "../middlewares/jwt.check";

class IndexRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  /**
   * @swagger
   * definitions:
   *  UserSignUp:
   *      type: object
   *      required:
   *        - nombre
   *        - apellidos
   *        - username
   *        - email
   *        - pass
   *        - roles
   *      properties:
   *        nombre:
   *            type: string
   *            example: "Juan"
   *        apellidos:
   *            type: string
   *            example: "Perez"
   *        username:
   *            type: string
   *            example: "juanperez"
   *        email:
   *            type: string
   *            example: "juan.perez@example.com"
   *        pass:
   *            type: string
   *            example: "password123"
   *        roles:
   *            type: array
   *            items:
   *              type: integer
   *            example: [1, 2, 3]
   *  UserUpdate:
   *      type: object
   *      required:
   *        - id
   *        - nombre
   *        - apellidos
   *        - email
   *        - roles
   *      properties:
   *        id:
   *           type: integer
   *           example: 1
   *        nombre:
   *            type: string
   *            example: "Juan"
   *        apellidos:
   *            type: string
   *            example: "Perez"
   *        email:
   *            type: string
   *            example: "juan.perez@example.com"
   *        roles:
   *            type: array
   *            items:
   *              type: integer
   *            example: [1, 2, 3]
   *  UserDelete:
   *      type: object
   *      required:
   *        - id
   *      properties:
   *        id:
   *           type: integer
   *           example: 1
   */
  config(): void {
    /**
     * @swagger
     * /api/users:
     *  get:
     *      tags: ["Index"]
     *      summary: Default Index
     *      description: Ruta por defecto de la API
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: Exitoso
     */
    this.router.get("/", jwtCheck, indexController.select);

    /**
     * @swagger
     * /api/users/insert:
     *  post:
     *      tags: ["Index"]
     *      summary: Insertar un nuevo usuario
     *      description: Inserta un nuevo usuario en la base de datos
     *      produces:
     *          - application/json
     *      parameters:
     *          - in: body
     *            name: Nuevo usuario
     *            description: Datos del usuario.
     *            schema:
     *              $ref: '#/definitions/UserSignUp'
     *            required: true
     *      responses:
     *          200:
     *              description: Exitoso
     */
    this.router.post(
      "/insert",
      insertRules(),
      [validate],
      indexController.insert
    );

    /**
     * @swagger
     * /api/users/update:
     *  put:
     *      tags: ["Index"]
     *      summary: Actualizar un usuario existente
     *      description: Actualiza los detalles de un usuario existente en la base de datos
     *      produces:
     *          - application/json
     *      parameters:
     *          - in: body
     *            name: Nuevos datos
     *            description: Datos del usuario.
     *            schema:
     *              $ref: '#/definitions/UserUpdate'
     *            required: true
     *      responses:
     *          200:
     *              description: Exitoso
     */
    this.router.post(
      "/update",
      updateRules(),
      [validate],
      indexController.update
    );

    /**
     * @swagger
     * /api/users/delete:
     *  delete:
     *      tags: ["Index"]
     *      summary: Eliminar un usuario
     *      description: Elimina un usuario de la base de datos
     *      produces:
     *          - application/json
     *      parameters:
     *          - in: body
     *            name: Id
     *            description: Id del usuario.
     *            schema:
     *              $ref: '#/definitions/UserDelete'
     *            required: true
     *      responses:
     *          200:
     *              description: Exitoso
     */
    this.router.post("/delete", indexController.delete);
  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
