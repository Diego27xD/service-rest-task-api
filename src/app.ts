import { envs } from "./config/envs";
import { Server } from "./server/server";
import { AppRoutes } from "./service/routes/app.routes";

/** Server Start */
(() => {
  main();
})();

function main() {
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });
  server.start();
}
