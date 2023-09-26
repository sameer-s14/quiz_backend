import { AuthRoute } from "./routes/auth.route";
import express, { Request } from "express";
import cors from "cors";
import { configs } from "./configs";
import { connectDatabase } from "./database/connection";
import { Routes } from "./interfaces";
import { MONGOOSE_EVENTS, RoutesConstants } from "./constants";
import { errorMiddleware } from "./middlewares";
import { logs } from "./helpers";
export class Application {
  public app: express.Application;
  private port: number;
  private env: string;

  constructor() {
    this.app = express();
    this.port = configs.PORT;
    this.env = configs.NODE_ENV;
  }
  public async init() {
    try {
      const dbStatus = await connectDatabase();
      if (dbStatus === MONGOOSE_EVENTS.CONNECTED) {
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
        this.listen();
        return this.app;
      }
    } catch (error) {
      logs.red(
        `Error occurred in initializing app: ${(error as Error)?.message}`
      );
      process.exit(1);
    }
  }

  private initializeMiddlewares(): void {
    this.app.use(
      cors({
        origin: configs.CORS.ORIGIN,
        credentials: configs.CORS.CREDENTIALS,
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    const routes: Routes[] = [AuthRoute];
    routes?.forEach((route) => this.app.use(route?.path, route.router));
  }

  private initializeErrorHandling(): void {
    this.app.all(RoutesConstants.NOT_FOUND, (req: Request) => {
      throw new Error(`Can't find ${req?.originalUrl} on this server!`);
    });
    this.app.use(errorMiddleware);
  }

  private listen(): void {
    this.app.listen(this.port, () => {
      logs.green(
        `🚀 App listening on the port ${this.port} ENV: ${this.env} mode...`
      );
    });
  }
}

export const ApplicationInstance = new Application();
