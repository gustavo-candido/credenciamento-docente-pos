import { AppDataSource } from "@typeorm/data-source";
import { MentorshipWork } from "@typeorm/entity/MentorshipWork";
import { Request, Response } from "express";
import { AppError, isAppError } from "../shared";
import MentorshipWorkRepository from "./MentorshipWorkRepository";

class MentorshipWorkController {
  private mentorshipWorkRepository: MentorshipWorkRepository;

  constructor() {
    this.mentorshipWorkRepository = new MentorshipWorkRepository(
      AppDataSource.getRepository(MentorshipWork)
    );
  }

  public async create(request: Request, response: Response) {
    const {
      professor_id,
      is_concluded,
      role,
      year,
      title,
      degree,
      student_name,
      sponsor_code,
      sponsor_name,
      nmonths,
    } = request.body;

    try {
      const mentorshipWork = await this.mentorshipWorkRepository.create({
        professor_id,
        is_concluded,
        role,
        year,
        title,
        degree,
        student_name,
        sponsor_code,
        sponsor_name,
        nmonths,
      });

      return response.json(mentorshipWork);
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
      const mentorshipWork = await this.mentorshipWorkRepository.findById(id);

      if (!mentorshipWork) {
        throw new AppError("Atividade de orientação não encontrada!", 404);
      }

      return response.json(mentorshipWork);
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }

  public async findByProfessor(
    request: Request<{ id: string }, {}, Record<string, string>>,
    response: Response
  ) {
    const { id } = request.params;

    try {
      const mentorshipWork =
        await this.mentorshipWorkRepository.findByProfessor(id);

      if (!mentorshipWork) {
        throw new AppError("Atividade de orientação não encontrada!", 404);
      }

      return response.json(mentorshipWork);
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
      professor_id,
      is_concluded,
      role,
      year,
      title,
      degree,
      student_name,
      sponsor_code,
      sponsor_name,
      nmonths,
    } = request.body;

    try {
      const mentorshipWork = await this.mentorshipWorkRepository.update(id, {
        professor_id,
        is_concluded,
        role,
        year,
        title,
        degree,
        student_name,
        sponsor_code,
        sponsor_name,
        nmonths,
      });
      return response.json(mentorshipWork);
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
      const mentorshipWork = await this.mentorshipWorkRepository.deleteById(id);

      return response.json(mentorshipWork);
    } catch (err) {
      return response.status(500).json({ error: err });
    }
  }
}

export default MentorshipWorkController;
