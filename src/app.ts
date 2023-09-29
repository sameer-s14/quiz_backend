import "reflect-metadata";
import express, { Request, Router } from "express";
import cors from "cors";
import { configs } from "./configs";
import { connectDatabase } from "./database/connection";
import { Routes } from "./interfaces";
import { MONGOOSE_EVENTS, RoutesConstants, VERSIONS } from "./constants";
import { errorMiddleware } from "./middlewares";
import { logs } from "./helpers";
import { TopicsRoute, AuthRoute, QuestionsRoute } from "./routes";
export class Application {
  public app: express.Application;
  private port: number;
  private env: string;

  constructor() {
    this.app = express();
    this.port = configs.PORT;
    this.env = configs.NODE_ENV;
  }

  /**
   * @description this method is used to initialize the application
   * @returns {app} App instance if db is connected successfully, otherwise undefined
   */
  public async init(): Promise<express.Application | undefined> {
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
    const routes: Routes[] = [AuthRoute, TopicsRoute, QuestionsRoute];
    routes?.forEach((route) => {
      this.logRoutes(route.router);
      return this.app.use(VERSIONS.V1, route.router);
    });
  }

  private initializeErrorHandling(): void {
    this.app.all(RoutesConstants.NOT_FOUND, (req: Request) => {
      throw new Error(`Can't find ${req?.originalUrl} on this server!`);
    });
    this.app.use(errorMiddleware);
  }

  private logRoutes(router: Router): void {
    router.stack.forEach((layer: any) => {
      if (layer.route) {
        console.log(
          `${Object.keys(layer.route?.methods)[0]?.toUpperCase()}`.blue,
          `: ${layer.route?.path}`
        );
      }
    });
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
