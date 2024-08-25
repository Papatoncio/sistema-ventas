import { Router } from "express";
import { rolController } from "../controllers/roles.controller";
import { jwtCheck } from "../middlewares/jwt.check";

class RolRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  config() {
    this.router.get("/getRolesUso", [jwtCheck], rolController.getRoles);
  }
}

const rolRoutes = new RolRoutes();
export default rolRoutes.router;
