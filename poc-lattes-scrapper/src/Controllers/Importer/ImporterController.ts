import { Request, Response } from "express";
import { AppError, isAppError } from "../shared";
import fs from "fs";
import FacomNormCred from "@FacomNormCred/index";
import { TFacomNormCred } from "@FacomNormCred/types";
import MentorshipWorkRepository from "../MentorshipWork/MentorshipWorkRepository";
import { AppDataSource } from "@typeorm/data-source";
import { MentorshipWork } from "@typeorm/entity/MentorshipWork";

class ImporterController {
  private mentorshipWorkRepository: MentorshipWorkRepository;

  constructor() {
    this.mentorshipWorkRepository = new MentorshipWorkRepository(
      AppDataSource.getRepository(MentorshipWork)
    );
  }

  private async saveMentorship(
    professorId: string,
    lattesData: TFacomNormCred
  ) {
    // lattesData.
    // const mentorshipWork = await this.mentorshipWorkRepository.create({
    //   professor_id: professorId,
    //   is_concluded,
    //   role,
    //   year,
    //   title,
    //   degree,
    //   student_name,
    //   sponsor_code,
    //   sponsor_name,
    //   nmonths,
    // });
  }

  public async import(request: Request, response: Response) {
    const {} = request.body;

    try {
      const path = request.file?.path;

      if (!path) throw new AppError("Não foi possível realizar o upload!", 500);

      const lattesData = await new FacomNormCred(path).getAllModules();

      fs.unlink(path, (err) => {
        if (err) throw err;
      });

      return response.json(lattesData);
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }
}

export default ImporterController;
