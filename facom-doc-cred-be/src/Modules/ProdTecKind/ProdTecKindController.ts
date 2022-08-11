import { AppDataSource } from "@typeorm/data-source";
import { Request, Response } from "express";
import { AppError, isAppError } from "../shared";
import ProdTecKindRepository from "./ProdTecKindRepository";

import { ProdTecKind } from "@typeorm/entity/ProdTecKind";

class ProdTecKindController {
  private prodTecKindRepository: ProdTecKindRepository;

  constructor() {
    this.prodTecKindRepository = new ProdTecKindRepository(
      AppDataSource.getRepository(ProdTecKind)
    );
  }

  public async create(request: Request, response: Response) {
    const { kind, score } = request.body;

    try {
      const prodTecKind = await this.prodTecKindRepository.create({
        kind,
        score,
      });

      return response.json(prodTecKind);
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
      const prodTecKind = await this.prodTecKindRepository.findById(id);

      if (!prodTecKind) {
        throw new AppError("Produção não encontrada!", 404);
      }

      return response.json(prodTecKind);
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }

  public async findAll(request: Request, response: Response) {
    try {
      const prodTecKind = await this.prodTecKindRepository.findAll();

      if (!prodTecKind) {
        throw new AppError("Produção não encontrada!", 404);
      }

      return response.json(prodTecKind);
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { kind, score } = request.body;

    try {
      const prodTecKind = await this.prodTecKindRepository.update(id, {
        kind,
        score,
      });
      return response.json(prodTecKind);
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
      const prodTecKind = await this.prodTecKindRepository.deleteById(id);

      return response.json(prodTecKind);
    } catch (err) {
      return response.status(500).json({ error: err });
    }
  }
}

export default ProdTecKindController;
