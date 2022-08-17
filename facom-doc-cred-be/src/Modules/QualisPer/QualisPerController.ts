import { AppDataSource } from "@typeorm/data-source";
import { QualisPer } from "@typeorm/entity/QualisPer";
import { Request, Response } from "express";
import { AppError, isAppError } from "../shared";
import QualisPerRepository from "./QualisPerRepository";

class QualisPerController {
  private qualisRepository: QualisPerRepository;

  constructor() {
    this.qualisRepository = new QualisPerRepository(
      AppDataSource.getRepository(QualisPer)
    );
  }

  public async create(request: Request, response: Response) {
    const { title, qualis, issn } = request.body;

    try {
      const qualisPer = await this.qualisRepository.create({
        title,
        qualis,
        issn,
      });

      return response.json(qualisPer);
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }

  public async findByISSN(
    request: Request<{ issn: string }, {}, Record<string, string>>,
    response: Response
  ) {
    const { issn } = request.params;

    try {
      const qualisPer = await this.qualisRepository.findByISSN(issn);

      if (!qualisPer) {
        throw new AppError("Qualis não encontrado!", 404);
      }

      return response.json(qualisPer);
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }

  public async findAll(request: Request, response: Response) {
    try {
      const qualisPer = await this.qualisRepository.findAll();

      if (!qualisPer) {
        throw new AppError("Qualis não encontrado!", 404);
      }

      return response.json(qualisPer);
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }

  public async update(request: Request, response: Response) {
    const { issn } = request.params;
    const { title, qualis, issnBody } = request.body;

    try {
      const qualisPer = await this.qualisRepository.update(issn, {
        title,
        qualis,
        issn: issnBody,
      });
      return response.json(qualisPer);
    } catch (err) {
      return response.status(500).json({ error: err });
    }
  }
}

export default QualisPerController;
