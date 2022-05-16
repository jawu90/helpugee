import express, { Router } from "express";
import environment from "../utils/environment.util";

export default function createAdminRoute(): express.RequestHandler {
  const router = Router();

  if (environment.development) {
    console.log(`Using development -> redirect to webadmin / webapp URLs`);

    router.use("/admin", (req, res) => {
      const newUrl = environment.frontendAdminAppDevServiceUrl + req.url;
      res.redirect(302, newUrl);
    });

    router.use((req, res) => {
      const newUrl = environment.frontendWebAppDevServiceUrl + req.url;
      res.redirect(302, newUrl);
    });

    return router;
  }

  console.log(`Serving static paths for webapp and webadmin`);
  router.use("/admin", express.static(environment.frontendAdminAppPath));
  router.use(express.static(environment.frontendWebAppPath));

  return router;
}
