import express, { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import environment from "../utils/environment.util";

export default function createAdminRoute(): express.RequestHandler {
  const router = Router();

  if (environment.development) {
    console.log(
      `Using development proxy for webadmin application ${environment.frontendAdminAppDevServiceUrl}`
    );

    const webappDevServerMiddleware = createProxyMiddleware({
      target: environment.frontendWebAppDevServiceUrl,
      changeOrigin: true,
    });

    const webadminDevServerMiddleware = createProxyMiddleware({
      target: environment.frontendAdminAppDevServiceUrl,
      changeOrigin: true,
    });

    router.use("/admin", (req, res) => {
      console.log(req.url);
      const newUrl = environment.frontendAdminAppDevServiceUrl + req.url;

      console.log({ newUrl });
      res.redirect(newUrl);
    });

    router.use((req, res) => {
      const newUrl = environment.frontendWebAppDevServiceUrl + req.url;

      console.log({ newUrl });
      res.redirect(newUrl);
    });

    return router;
  }

  console.log(`Serving static paths for webapp and webadmin`);
  router.use("/admin", express.static(environment.frontendAdminAppPath));
  router.use(express.static(environment.frontendWebAppPath));

  return router;
}
