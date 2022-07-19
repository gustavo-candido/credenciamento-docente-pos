import { AppDataSource } from "@typeorm/data-source";
import { Professor } from "@typeorm/entity/Professor";
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
      name,
      birth_date,
      research_topic_id,
      ppgco_weekly_workload,
      other_ppg_weekly_workload,
      has_pq_or_dt_sponsor,
    } = request.body;

    try {
      const isDuplicateProfessor = !!(await this.professorRepository.findByName(
        name
      ));

      if (isDuplicateProfessor) {
        throw new AppError("Docente já cadastrado");
      }

      const professor = await this.professorRepository.create({
        name,
        birth_date,
        research_topic_id,
        ppgco_weekly_workload,
        other_ppg_weekly_workload,
        has_pq_or_dt_sponsor,
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

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
      name,
      birth_date,
      research_topic_id,
      ppgco_weekly_workload,
      other_ppg_weekly_workload,
      has_pq_or_dt_sponsor,
    } = request.body;

    try {
      const professor = await this.professorRepository.update(id, {
        name,
        birth_date,
        research_topic_id,
        ppgco_weekly_workload,
        other_ppg_weekly_workload,
        has_pq_or_dt_sponsor,
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
