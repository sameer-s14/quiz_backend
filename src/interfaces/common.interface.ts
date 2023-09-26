import { Router } from "express";

export interface Routes {
  path: string;
  router: Router;
}

export interface IResponse<T = unknown> {
  status?: boolean;
  message?: string;
  data?: T;
}
