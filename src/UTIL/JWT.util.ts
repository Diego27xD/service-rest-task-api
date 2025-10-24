import jwt from "jsonwebtoken";

export class JWTUtil {
  private readonly tokenSecret: string;

  constructor(JWT_TOKEN_SECRET: string) {
    this.tokenSecret = JWT_TOKEN_SECRET;
  }

  public generateToken<T>(
    dataSave: { [key: string]: any },
    expiresIn: string
  ): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.sign(
        dataSave,
        this.tokenSecret,
        {
          expiresIn: expiresIn,
          algorithm: "HS256",
        },
        (err, decoded) => {
          if (err) {
            resolve(null);
          } else {
            resolve(decoded as T);
          }
        }
      );
    });
  }

  public verifyToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, this.tokenSecret, (err, decoded) => {
        if (err) {
          resolve(null);
        } else {
          resolve(decoded as T);
        }
      });
    });
  }
}
