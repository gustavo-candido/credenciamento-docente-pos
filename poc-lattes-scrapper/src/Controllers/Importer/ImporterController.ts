import { AppDataSource } from "@typeorm/data-source";
import { Request, Response } from "express";
import { AppError, isAppError } from "../shared";
import fs from "fs";
import FacomNormCred from "@FacomNormCred/index";

class ImporterController {
  constructor() {
    // this.mentorshipWorkRepository = new MentorshipWorkRepository(
    //   AppDataSource.getRepository(MentorshipWork)
    // );
  }

  public async import(request: Request, response: Response) {
    const {} = request.body;

    try {
      const path = request.file?.path;

      if (!path) throw new AppError("Não foi possível realizar o upload!", 500);

      // fs.unlink(path, (err) => {
      //   if (err) throw err;
      // });

      const lattesData = await new FacomNormCred(path).getAllModules();

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
