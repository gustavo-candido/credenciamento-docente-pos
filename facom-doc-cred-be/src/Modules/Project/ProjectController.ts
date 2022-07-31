import { AppDataSource } from "@typeorm/data-source";
import { Project } from "@typeorm/entity/Project";
import { Request, Response } from "express";
import { AppError, isAppError } from "../shared";
import ProjectRepository from "./ProjectRepository";

class ProjectController {
  private projectRepository: ProjectRepository;

  constructor() {
    this.projectRepository = new ProjectRepository(
      AppDataSource.getRepository(Project)
    );
  }

  public async create(request: Request, response: Response) {
    const { professor_id, title, responsible_id, year, has_sponsor, kind } =
      request.body;

    try {
      const project = await this.projectRepository.create({
        professor_id,
        title,
        responsible_id,
        year,
        has_sponsor,
        kind,
      });

      return response.json(project);
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
      const project = await this.projectRepository.findById(id);

      if (!project) {
        throw new AppError("Projeto não encontrado!", 404);
      }

      return response.json(project);
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { professor_id, title, responsible_id, year, has_sponsor, kind } =
      request.body;

    try {
      const project = await this.projectRepository.update(id, {
        professor_id,
        title,
        responsible_id,
        year,
        has_sponsor,
        kind,
      });
      return response.json(project);
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
      const project = await this.projectRepository.deleteById(id);

      return response.json(project);
    } catch (err) {
      return response.status(500).json({ error: err });
    }
  }
}

export default ProjectController;
