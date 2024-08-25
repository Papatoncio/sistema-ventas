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
exports.rolController = void 0;
const database_1 = __importDefault(require("../database/database"));
class RolController {
    getRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rolesUso = yield database_1.default.tbl_rol.findMany({
                    orderBy: { nombre: "asc" },
                });
                console.log(rolesUso);
                return res.status(200).json(rolesUso);
            }
            catch (error) {
                return res.status(500).json({ message: "Error en el servidor" });
            }
        });
    }
}
exports.rolController = new RolController();
