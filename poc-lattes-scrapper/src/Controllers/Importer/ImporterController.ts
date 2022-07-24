import { Request, Response } from "express";
import { AppError, isAppError } from "../shared";
import fs from "fs";
import FacomNormCred from "@FacomNormCred/index";
import { TFacomNormCred } from "@FacomNormCred/types";
import MentorshipWorkRepository from "../MentorshipWork/MentorshipWorkRepository";
import { AppDataSource } from "@typeorm/data-source";
import { MentorshipWork } from "@typeorm/entity/MentorshipWork";
import { Professor } from "@typeorm/entity/Professor";

class ImporterController {
  private mentorshipWorkRepository: MentorshipWorkRepository;

  constructor() {
    this.mentorshipWorkRepository = new MentorshipWorkRepository(
      AppDataSource.getRepository(MentorshipWork)
    );
  }

  private async saveMentorship(
    professorId: Professor["id"],
    lattesData: TFacomNormCred
  ) {
    const lattesDataWithProfId = lattesData.mentorship.map((item) => ({
      ...item,
      professor_id: professorId,
    }));

    const mentorshipWork = await this.mentorshipWorkRepository.create(
      lattesDataWithProfId
    );

    return mentorshipWork;
  }

  public async import(request: Request, response: Response) {
    const { professor_id } = request.params;

    try {
      const path = request.file?.path;

      if (!path) throw new AppError("Não foi possível realizar o upload!", 500);

      const lattesData = await new FacomNormCred(path).getAllModules();

      const x = await this.saveMentorship(professor_id, lattesData);

      fs.unlink(path, (err) => {
        if (err) throw err;
      });

      return response.json({ data: x });
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }
}

export default ImporterController;
