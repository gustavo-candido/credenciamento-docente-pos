import { AppDataSource } from "@typeorm/data-source";
import { QualisAnais } from "@typeorm/entity/QualisAnais";
import { Request, Response } from "express";
import { AppError, isAppError } from "../shared";
import QualisAnaisRepository from "./QualisAnaisRepository";

class QualisAnaisController {
  private qualisRepository: QualisAnaisRepository;

  constructor() {
    this.qualisRepository = new QualisAnaisRepository(
      AppDataSource.getRepository(QualisAnais)
    );
  }

  public async create(request: Request, response: Response) {
    const { name, qualis, sigla } = request.body;

    try {
      const qualisAnal = await this.qualisRepository.create({
        name,
        qualis,
        sigla,
      });

      return response.json(qualisAnal);
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }

  public async findBySigla(
    request: Request<{ sigla: string }, {}, Record<string, string>>,
    response: Response
  ) {
    const { sigla } = request.params;

    try {
      const qualisAnal = await this.qualisRepository.findBySigla(sigla);

      if (!qualisAnal) {
        throw new AppError("Qualis não encontrado!", 404);
      }

      return response.json(qualisAnal);
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }

  public async findAll(request: Request, response: Response) {
    try {
      const qualisAnal = await this.qualisRepository.findAll();

      if (!qualisAnal) {
        throw new AppError("Qualis não encontrado!", 404);
      }

      return response.json(qualisAnal);
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }

  public async update(request: Request, response: Response) {
    const { sigla } = request.params;
    const { name, qualis, siglaBody } = request.body;

    try {
      const qualisAnal = await this.qualisRepository.update(sigla, {
        name,
        qualis,
        sigla: siglaBody,
      });
      return response.json(qualisAnal);
    } catch (err) {
      return response.status(500).json({ error: err });
    }
  }
}

export default QualisAnaisController;
