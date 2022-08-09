import { Request, Response } from "express";
import fs from "fs";
import { AppError, isAppError } from "../shared";
import FacomNormCred from "@FacomNormCred/index";
import { AppDataSource } from "@typeorm/data-source";
import { MentorshipWork } from "@typeorm/entity/MentorshipWork";
import { Professor } from "@typeorm/entity/Professor";
import { ProdBib } from "@typeorm/entity/ProdBib";
import MentorshipWorkRepository from "../MentorshipWork/MentorshipWorkRepository";
import ProdBibRepository from "../ProdBib/ProdBibRepository";
import ProjectRepository from "../Project/ProjectRepository";
import { TFacomNormCred } from "@FacomNormCred/types";
import { Project } from "@typeorm/entity/Project";

class ImporterController {
  private mentorshipWorkRepository: MentorshipWorkRepository;
  private prodBibRepository: ProdBibRepository;
  private projectRepository: ProjectRepository;

  constructor() {
    this.mentorshipWorkRepository = new MentorshipWorkRepository(
      AppDataSource.getRepository(MentorshipWork)
    );
    this.prodBibRepository = new ProdBibRepository(
      AppDataSource.getRepository(ProdBib)
    );
    this.projectRepository = new ProjectRepository(
      AppDataSource.getRepository(Project)
    );
  }

  private async clearData(professorId: Professor["id"]) {
    await this.mentorshipWorkRepository.deleteByProfessor(professorId);
    await this.prodBibRepository.deleteByProfessor(professorId);
    await this.projectRepository.deleteByProfessor(professorId);
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

  private async saveProject(
    professorId: Professor["id"],
    lattesData: TFacomNormCred
  ) {
    const lattesDataWithProfId = lattesData.project.map((item) => ({
      ...item,
      professor_id: professorId,
    }));

    const project = await this.projectRepository.create(lattesDataWithProfId);

    return project;
  }

  public async import(request: Request, response: Response) {
    const { professor_id } = request.params;

    try {
      const path = request.file?.path;

      if (!path) throw new AppError("Não foi possível realizar o upload!", 500);

      const lattesData = await new FacomNormCred(path).getAllModules();

      await this.clearData(professor_id);
      await this.saveMentorship(professor_id, lattesData);
      await this.saveProdBib(professor_id, lattesData);
      await this.saveProject(professor_id, lattesData);

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

  public async test(request: Request, response: Response) {
    const path = request.file?.path!;
    const facomNormCred = await new FacomNormCred(path).getAllModules();

    fs.unlink(path, (err) => {
      if (err) throw err;
    });

    // response.json(await new FacomNormCred(path).getProjectModule());
    response.json(facomNormCred);
  }
}

export default ImporterController;
