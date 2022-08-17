import { Router } from "express";
import QualisAnaisController from "./QualisAnaisController";

const qualisAnalrouter = Router();

const qualisAnais = new QualisAnaisController();

qualisAnalrouter.post(
  "/",
  async (request, response) => await qualisAnais.create(request, response)
);

qualisAnalrouter.get(
  "/",
  async (request, response) => await qualisAnais.findAll(request, response)
);

qualisAnalrouter.get(
  "/:sigla",
  async (request, response) => await qualisAnais.findBySigla(request, response)
);

qualisAnalrouter.patch(
  "/:sigla/update",
  async (request, response) => await qualisAnais.update(request, response)
);

export default qualisAnalrouter;
