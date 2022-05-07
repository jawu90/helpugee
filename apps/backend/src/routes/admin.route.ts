import express, { Router } from "express";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import environment from "../utils/environment.util";

export default function adminRoute(): express.RequestHandler {
  if (environment.development) {
    console.log(
      `Using development proxy for webadmin application ${environment.frontendAdminAppDevServiceUrl}`
    );
    return createProxyMiddleware({
      target: environment.frontendAdminAppDevServiceUrl,
    } as Options);
  }

  const router = Router();

  router.use(express.static(environment.frontendAdminAppPath));

  return router;
}
