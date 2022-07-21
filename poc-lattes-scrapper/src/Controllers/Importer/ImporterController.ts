import { AppDataSource } from "@typeorm/data-source";
import { Request, Response } from "express";
import { AppError, isAppError } from "../shared";

class ImporterController {
  constructor() {
    // this.mentorshipWorkRepository = new MentorshipWorkRepository(
    //   AppDataSource.getRepository(MentorshipWork)
    // );
  }

  public async import(request: Request, response: Response) {
    const {} = request.body;

    try {
      return response.json({ okay: `okay` });
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }
}

export default ImporterController;
