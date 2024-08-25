import jwt from "jsonwebtoken";
import keys from "../config/keys";
import bcrypt from "bcryptjs";

/*
 * @name Utils
 * @author Juan Pablo Jiménez Jaime
 * @creation 05/07/2024
 */
class Utils {
  /**
   * @name generateJWT
   * @description Método para geerar un token por medio del OAUTH
   * @param payload
   * @returns string
   */
  public generateJWT(payload: any): string {
    var token = jwt.sign(payload, keys.secret.jwt, { expiresIn: "1h" });
    return token;
  }

  /**
   * @name getPayload
   * @description Método para obtener la información del jwt
   * @param token
   * @returns object
   */
  public getPayload(token: string): any {
    const payload = <any>jwt.verify(token, keys.secret.jwt);
    const { iat, exp, ...data } = payload;

    return data;
  }

  /**
   * @name hashPassword
   * @description Método para encriptar una cadena de texto
   * @param password
   * @returns string
   */
  public async hashPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10);
    return await bcrypt.hashSync(password, salt);
  }

  /**
   * @name checkPassword
   * @description Verificar la contraseña
   * @param password
   * @param encryptedPassword
   * @returns boolean
   */
  public async checkPassword(
    password: string,
    encryptedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compareSync(password, encryptedPassword);
  }
}
export const utils = new Utils();
