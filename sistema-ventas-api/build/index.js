"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const api_docs_1 = __importDefault(require("./routes/api.docs"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const roles_routes_1 = __importDefault(require("./routes/roles.routes"));
class Server {
    // * Generar el método constructor
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    // * Generar un método para la configuración
    config() {
        var _a;
        // *  Configuración para el puerto del servidor
        this.app.set("port", (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000);
        // * Mostrar las peticiones en consola
        this.app.use((0, morgan_1.default)("dev"));
        // * Uso de CORS (Cross Origin)
        this.app.use((0, cors_1.default)());
        // * Generar restricciones a la API
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    // * Generar un método para la configuración de rutas
    routes() {
        this.app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(api_docs_1.default));
        this.app.use("/api/users", index_routes_1.default);
        this.app.use("/api/oauth", auth_routes_1.default);
        this.app.use("/api/rol", roles_routes_1.default);
    }
    // * Generar un método para iniciar el servicio
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port:", this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();
