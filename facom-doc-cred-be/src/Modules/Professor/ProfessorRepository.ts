import { DeepPartial, Repository } from "typeorm";
import { Professor } from "@typeorm/entity/Professor";
import removeUndefinedKeys from "@utils/removeUndefinedKeys";

type ProfessorDTO = DeepPartial<Professor>;
class ProfessorRepository {
  constructor(private ormRepository: Repository<Professor>) {}

  public async create({
    lattes_id,
    birth_date,
    has_pq_or_dt_sponsor,
    name,
    other_ppg_weekly_workload,
    placement,
    ppgco_weekly_workload,
    research_topic_id,
    user_id,
  }: ProfessorDTO) {
    const professor = this.ormRepository.create({
      lattes_id,
      birth_date: birth_date ? new Date(birth_date as string) : undefined,
      has_pq_or_dt_sponsor,
      name,
      other_ppg_weekly_workload,
      placement,
      ppgco_weekly_workload,
      research_topic_id: research_topic_id,
      user_id,
    });

    await this.ormRepository.save(professor);

    return professor;
  }

  public async findById(professorId: string) {
    const professor = await this.ormRepository.findOne({
      where: { id: professorId },
      relations: ["research_topic_id"],
    });
    return professor;
  }

  public async findByName(professorName: string) {
    const professor = await this.ormRepository.findOneBy({
      name: professorName,
    });

    return professor;
  }

  public async findByUser(userId: string) {
    const professor = await this.ormRepository.query(
      `select * from professor where user_id = '${userId}'`
    );

    return professor[0];
  }

  public async findByLattes(lattesId: string): Promise<Professor | undefined> {
    const professor = await this.ormRepository.query(
      `select * from professor where lattes_id = '${lattesId}'`
    );

    return professor[0];
  }

  public async update(professorId: string, professorNewData: ProfessorDTO) {
    const professor = await this.ormRepository.findOne({
      where: { id: professorId },
    });

    const professorNewDataFiltered = removeUndefinedKeys({
      ...professorNewData,
      birth_date: professorNewData?.birth_date
        ? new Date(professorNewData.birth_date as string)
        : undefined,
    });

    const updatedProfessor = {
      ...professor,
      ...professorNewDataFiltered,
    };

    await this.ormRepository.save(updatedProfessor);
    return updatedProfessor;
  }

  public async deleteById(professorId: string) {
    const professor = await this.findById(professorId);

    if (professor) {
      await this.ormRepository.remove(professor);
    }

    return professor;
  }
}

export default ProfessorRepository;
