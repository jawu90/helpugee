import express, { Router } from "express";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import environment from "../utils/environment.util";

export default function webappRoute(): express.RequestHandler {
  if (environment.development) {
    console.log(
      `Using development proxy for webapp application -> ${environment.frontendWebAppDevServiceUrl}`
    );
    return createProxyMiddleware({
      target: environment.frontendWebAppDevServiceUrl,
    } as Options);
  }

  const router = Router();

  console.log(
    `Serving path for webapp application ${environment.frontendWebAppPath}`
  );
  router.use(express.static(environment.frontendWebAppPath));

  return router;
}
