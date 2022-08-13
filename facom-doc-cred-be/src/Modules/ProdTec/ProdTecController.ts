import { AppDataSource } from "@typeorm/data-source";
import { ProdTec } from "@typeorm/entity/ProdTec";
import { Request, Response } from "express";
import { AppError, isAppError } from "../shared";
import ProdTecRepository from "./ProdTecRepository";

class ProdTecController {
  private prodTecRepository: ProdTecRepository;

  constructor() {
    this.prodTecRepository = new ProdTecRepository(
      AppDataSource.getRepository(ProdTec)
    );
  }

  public async create(request: Request, response: Response) {
    const { professor_id, prod_tec_kind_id, year, description, quantity } =
      request.body;

    try {
      const prodTec = await this.prodTecRepository.create({
        professor_id,
        prod_tec_kind_id,
        year,
        description,
        quantity,
      });

      return response.json(prodTec);
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
      const prodTec = await this.prodTecRepository.findById(id);

      if (!prodTec) {
        throw new AppError("Produção não encontrada!", 404);
      }

      return response.json(prodTec);
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }

  public async findByProfessor(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const prodTec = await this.prodTecRepository.findByProfessor(id);

      if (!prodTec) {
        throw new AppError("Produção não encontrada!", 404);
      }

      return response.json(prodTec);
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { professor_id, prod_tec_kind_id, year, description, quantity } =
      request.body;

    try {
      const prodTec = await this.prodTecRepository.update(id, {
        professor_id,
        prod_tec_kind_id,
        year,
        description,
        quantity,
      });
      return response.json(prodTec);
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
      const prodTec = await this.prodTecRepository.deleteById(id);

      return response.json(prodTec);
    } catch (err) {
      return response.status(500).json({ error: err });
    }
  }
}

export default ProdTecController;
