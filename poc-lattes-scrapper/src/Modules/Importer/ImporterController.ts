import { Request, Response } from "express";
import { AppError, isAppError } from "../shared";
import fs from "fs";
import FacomNormCred from "@FacomNormCred/index";
import { TFacomNormCred } from "@FacomNormCred/types";
import MentorshipWorkRepository from "../MentorshipWork/MentorshipWorkRepository";
import { AppDataSource } from "@typeorm/data-source";
import { MentorshipWork } from "@typeorm/entity/MentorshipWork";
import { Professor } from "@typeorm/entity/Professor";
import ProdBibRepository from "../ProdBib/ProdBibRepository";
import { ProdBib } from "@typeorm/entity/ProdBib";
import FacomLattesExtractor from "@FacomLattesExtractor/index";

class ImporterController {
  private mentorshipWorkRepository: MentorshipWorkRepository;
  private prodBibRepository: ProdBibRepository;

  constructor() {
    this.mentorshipWorkRepository = new MentorshipWorkRepository(
      AppDataSource.getRepository(MentorshipWork)
    );
    this.prodBibRepository = new ProdBibRepository(
      AppDataSource.getRepository(ProdBib)
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

  private async saveProdBib(
    professorId: Professor["id"],
    lattesData: TFacomNormCred
  ) {
    const lattesDataWithProfId = lattesData.prod_bib.map((item) => ({
      ...item,
      professor_id: professorId,
    }));

    const mentorshipWork = await this.prodBibRepository.create(
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

      await this.saveMentorship(professor_id, lattesData);
      await this.saveProdBib(professor_id, lattesData);

      fs.unlink(path, (err) => {
        if (err) throw err;
      });

      return response.json({ data: lattesData });
    } catch (err) {
      if (isAppError(err)) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response.status(500).json({ error: err });
    }
  }

  public test(request: Request, response: Response) {
    const path = request.file?.path!;
    const facomLattesExtractor = new FacomLattesExtractor(path);

    response.json({ data: facomLattesExtractor.getBooksAndChapters() });
  }
}

export default ImporterController;
