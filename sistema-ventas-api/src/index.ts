import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express";

class Server {
  // * Crear la instancia global de nuestra app.
  public app: Application;

  // * Generar el constructor.
  constructor() {
    this.app = express();
    this.config();
  }

  // * Generar un método para la configuración.
  private config(): void {
    // * Configuración del puerto para el server.
    this.app.set("port", process.env.PORT ?? 3000);

    // * Mostrar las peticiones en consola
    this.app.use(morgan("dev"));

    // * Uso de CORS (Cross Origin)
    this.app.use(cors());

    // * Genera restricción a la API
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  // ! Generar un método para la configuración de rutas.
  private routes(): void {
    throw new Error("Not Implemented");
  }

  // * Generar un método para inicializar el servicio.
  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port", this.app.get("port"));
    });
  }
}

const server = new Server();
server.start();
