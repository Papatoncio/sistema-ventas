"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roles_controller_1 = require("../controllers/roles.controller");
const jwt_check_1 = require("../middlewares/jwt.check");
class RolRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/getRolesUso", [jwt_check_1.jwtCheck], roles_controller_1.rolController.getRoles);
    }
}
const rolRoutes = new RolRoutes();
exports.default = rolRoutes.router;
