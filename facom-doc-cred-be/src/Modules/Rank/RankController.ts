import Rank from "@FacomNormCred/Rank";
import { AppDataSource } from "@typeorm/data-source";
import { Request, Response } from "express";
import ProfessorRepository from "../Professor/ProfessorRepository";
import { Professor } from "@typeorm/entity/Professor";

class RankController {
  public async getProfessorPoints(request: Request, response: Response) {
    const { id } = request.params;

    const rank = new Rank(id);
    return response.json({
      ...(await rank.getRankVariables()),
      total: await rank.getPontDoc(),
    });
  }

  public async getAllPoints(request: Request, response: Response) {
    const professorRepository = new ProfessorRepository(
      AppDataSource.getRepository(Professor)
    );
    const professors = await professorRepository.index();

    let professorsPoints = [];

    for (let professor of professors) {
      const rank = new Rank(professor.id);

      professorsPoints.push({
        name: professor.name,
        points: await rank.getPontDoc(),
      });
    }

    const professorsPointsSorted = professorsPoints.sort(
      (a, b) => parseFloat(b.points) - parseFloat(a.points)
    );

    return response.json(professorsPointsSorted);
  }
}

export default RankController;
