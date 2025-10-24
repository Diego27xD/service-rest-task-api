import cors from "cors";
import express, { Router } from "express";
import swaggerUI from "swagger-ui-express";
import { stylesCustom, swaggerDocs } from "../service/swagger/swagger.config";

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    // Define la carpeta public como estática
    //this.app.use(express.static("uploads"));

    /** Middlewares */
    this.app.use(express.json({ limit: "2GB" }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());

    /** Routes */
    this.app.use(this.routes);

    /** Swagger */
    this.app.use(
      "/swagger",
      swaggerUI.serve,
      swaggerUI.setup(swaggerDocs, stylesCustom)
    );

    /** Server */

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
