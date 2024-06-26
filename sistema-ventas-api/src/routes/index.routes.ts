import { Router } from "express";
import { indexController } from "../controllers/index.controller";

class IndexRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  config(): void {
    this.router.get("/", indexController.index);
    this.router.post("/", indexController.insert);
    this.router.put("/", indexController.update);
    this.router.delete("/", indexController.delete);
  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
