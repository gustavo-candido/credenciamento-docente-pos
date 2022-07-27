import { AppDataSource } from "@typeorm/data-source";
import { ProdBib } from "@typeorm/entity/ProdBib";
import { Request, Response } from "express";
import { AppError, isAppError } from "../shared";
import ProdBibRepository from "./ProdBibRepository";

class ProdBibController {
  private prodBibRepository: ProdBibRepository;

  constructor() {
    this.prodBibRepository = new ProdBibRepository(
      AppDataSource.getRepository(ProdBib)
    );
  }

  public async create(request: Request, response: Response) {
    const { professor_id, issn_or_sigla, year, title, event_name } =
      request.body;

    try {
      const prodBib = await this.prodBibRepository.create({
        professor_id,
        issn_or_sigla,
        year,
        title,
        event_name,
      });

      return response.json(prodBib);
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }

  public async findById(
    request: Request<{ id: string }, {}, Record<string, string>>,
    response: Response
  ) {
    const { id } = request.params;

    try {
      const prodBib = await this.prodBibRepository.findById(id);

      if (!prodBib) {
        throw new AppError("Produção não encontrada!", 404);
      }

      return response.json(prodBib);
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { professor_id, issn_or_sigla, year, title, event_name } =
      request.body;

    try {
      const prodBib = await this.prodBibRepository.update(id, {
        professor_id,
        issn_or_sigla,
        year,
        title,
        event_name,
      });
      return response.json(prodBib);
    } catch (err) {
      return response.status(500).json({ error: err });
    }
  }

  public async deleteById(
    request: Request<{ id: string }, {}, Record<string, string>>,
    response: Response
  ) {
    const { id } = request.params;

    try {
      const prodBib = await this.prodBibRepository.deleteById(id);

      return response.json(prodBib);
    } catch (err) {
      return response.status(500).json({ error: err });
    }
  }
}

export default ProdBibController;
