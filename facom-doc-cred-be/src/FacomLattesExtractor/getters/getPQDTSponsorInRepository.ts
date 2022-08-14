import { AppDataSource } from "@typeorm/data-source";
import ProfessorRepository from "src/Modules/Professor/ProfessorRepository";
import { Professor } from "@typeorm/entity/Professor";

export async function getPQDTSponsorInRepository(lattesId: string) {
  const professorRepository = new ProfessorRepository(
    AppDataSource.getRepository(Professor)
  );

  const professor = await professorRepository.findByLattes(lattesId);

  return professor?.has_pq_or_dt_sponsor ?? false;
}
