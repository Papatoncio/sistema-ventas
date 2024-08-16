import { body } from "express-validator";

export const insertRules = () => {
  return [
    body("nombre")
      .exists()
      .withMessage("Campo requerido")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Campo requerido")
      .isLength({ min: 3, max: 250 })
      .withMessage("El nombre debe tener entre 3 y 250 caracteres"),

    body("apellidos")
      .exists()
      .withMessage("Campo requerido")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Campo requerido")
      .isLength({ min: 3, max: 600 })
      .withMessage("Los apellidos deben tener entre 3 y 600 caracteres"),

    body("username")
      .exists()
      .withMessage("Campo requerido")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Campo requerido")
      .isLength({ min: 3, max: 150 })
      .withMessage("El nombre de usuario debe tener entre 3 y 150 caracteres"),

    body("email")
      .exists()
      .withMessage("Campo requerido")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Campo requerido")
      .isEmail()
      .withMessage("Debe ser un email válido")
      .isLength({ max: 150 })
      .withMessage("El email no debe exceder los 150 caracteres"),

    body("pass")
      .exists()
      .withMessage("Campo requerido")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Campo requerido")
      .isLength({ min: 3, max: 800 })
      .withMessage("La contraseña debe tener entre 3 y 800 caracteres"),

    body("roles")
      .exists()
      .withMessage("Campo requerido")
      .isArray()
      .withMessage("cverol debe ser un número entero"),
  ];
};

export const updateRules = () => {
  return [
    body("id")
      .exists()
      .withMessage("Campo requerido")
      .isInt()
      .withMessage("cverol debe ser un número entero"),

    body("nombre")
      .exists()
      .withMessage("Campo requerido")
      .trim()
      .isLength({ min: 3, max: 250 })
      .withMessage("El nombre debe tener entre 3 y 250 caracteres"),

    body("apellidos")
      .exists()
      .withMessage("Campo requerido")
      .trim()
      .isLength({ min: 3, max: 600 })
      .withMessage("Los apellidos deben tener entre 3 y 600 caracteres"),

    body("email")
      .exists()
      .withMessage("Campo requerido")
      .trim()
      .isEmail()
      .withMessage("Debe ser un email válido")
      .isLength({ max: 150 })
      .withMessage("El email no debe exceder los 150 caracteres"),

    body("roles")
      .exists()
      .withMessage("Campo requerido")
      .isArray()
      .withMessage("roles debe ser un arreglo de enteros"),
  ];
};
