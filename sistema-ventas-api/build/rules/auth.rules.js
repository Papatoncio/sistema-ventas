"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRules = void 0;
const express_validator_1 = require("express-validator");
const authRules = () => {
    return [
        (0, express_validator_1.body)("username")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Campo requerido")
            .isLength({ min: 3, max: 150 })
            .withMessage("Rango incorrecto"),
        (0, express_validator_1.body)("password")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Campo requerido")
            .isLength({ min: 3, max: 150 })
            .withMessage("Rango incorrecto"),
    ];
};
exports.authRules = authRules;
