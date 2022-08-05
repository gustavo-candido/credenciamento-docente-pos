import { AppDataSource } from "@typeorm/data-source";
import { ResearchTopic } from "@typeorm/entity/ResearchTopic";
import { Request, Response } from "express";
import { AppError, isAppError } from "../shared";
import ResearchTopicRepository from "./ResearchTopicRepository";

class ResearchTopicController {
  private researchTopicRepository: ResearchTopicRepository;

  constructor() {
    this.researchTopicRepository = new ResearchTopicRepository(
      AppDataSource.getRepository(ResearchTopic)
    );
  }

  public async create(
    request: Request<{}, {}, Record<string, string>>,
    response: Response
  ) {
    const { topic } = request.body;

    try {
      const isDuplicateResearchTopic =
        !!(await this.researchTopicRepository.findByName(topic));

      if (isDuplicateResearchTopic) {
        throw new AppError("Linha de pesquisa já cadastrado");
      }

      const researchTopic = await this.researchTopicRepository.create({
        topic,
      });

      return response.json(researchTopic);
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
      const researchTopic = await this.researchTopicRepository.findById(id);

      if (!researchTopic) {
        throw new AppError("Linha de pesquisa não encontrada!", 404);
      }

      return response.json(researchTopic);
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }

  public async findAll(request: Request, response: Response) {
    try {
      const researchTopic = await this.researchTopicRepository.findAll();

      return response.json(researchTopic);
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }

  public async update(
    request: Request<{ id: string }, {}, Record<string, string>>,
    response: Response
  ) {
    const { id } = request.params;
    const { topic } = request.body;

    try {
      const professor = await this.researchTopicRepository.update(id, {
        topic,
      });

      return response.json(professor);
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
      const researchTopic = await this.researchTopicRepository.deleteById(id);

      return response.json(researchTopic);
    } catch (err) {
      return response.status(500).json({ error: err });
    }
  }
}

export default ResearchTopicController;
