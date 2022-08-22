import { AppDataSource } from "@typeorm/data-source";
import { Professor } from "@typeorm/entity/Professor";
import validPlacement from "@utils/validPlacement";
import { Request, Response } from "express";
import { AppError, isAppError } from "../shared";
import ProfessorRepository from "./ProfessorRepository";

class ProfessorController {
  private professorRepository: ProfessorRepository;

  constructor() {
    this.professorRepository = new ProfessorRepository(
      AppDataSource.getRepository(Professor)
    );
  }

  public async create(request: Request, response: Response) {
    const {
      lattes_id,
      birth_date,
      has_pq_or_dt_sponsor,
      name,
      other_ppg_weekly_workload,
      placement,
      ppgco_weekly_workload,
      research_topic_id,
      user_id,
    } = request.body;

    try {
      const isDuplicateProfessor = !!(await this.professorRepository.findByName(
        name
      ));

      const professor = await this.professorRepository.create({
        lattes_id,
        name,
        birth_date,
        research_topic_id,
        ppgco_weekly_workload,
        other_ppg_weekly_workload,
        placement,
        has_pq_or_dt_sponsor,
        user_id,
      });

      return response.json(professor);
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
      const professor = await this.professorRepository.findById(id);

      if (!professor) {
        throw new AppError("Docente não encontrado!", 404);
      }

      return response.json(professor);
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }

  public async findByUser(
    request: Request<{ id: string }, {}, Record<string, string>>,
    response: Response
  ) {
    const { id } = request.params;

    try {
      const professor = await this.professorRepository.findByUser(id);

      if (!professor) {
        throw new AppError("Docente não encontrado!", 404);
      }

      return response.json(professor);
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
      lattes_id,
      birth_date,
      has_pq_or_dt_sponsor,
      name,
      other_ppg_weekly_workload,
      placement,
      ppgco_weekly_workload,
      research_topic_id,
    } = request.body;

    try {
      const professor = await this.professorRepository.update(id, {
        lattes_id,
        birth_date,
        has_pq_or_dt_sponsor,
        name,
        other_ppg_weekly_workload,
        placement,
        ppgco_weekly_workload,
        research_topic_id,
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
      const professor = await this.professorRepository.deleteById(id);

      return response.json(professor);
    } catch (err) {
      return response.status(500).json({ error: err });
    }
  }
}

export default ProfessorController;
