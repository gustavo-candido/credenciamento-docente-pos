import { DeepPartial, Repository } from "typeorm";
import { Professor } from "@typeorm/entity/Professor";
import removeUndefinedKeys from "@utils/removeUndefinedKeys";

export interface IProfessorDTO {
  name: string;
  birth_date: Date;
  research_topic_id: DeepPartial<Professor>;
  ppgco_weekly_workload: number;
  other_ppg_weekly_workload: number;
  has_pq_or_dt_sponsor: false;
  placement: string;
}
class ProfessorRepository {
  constructor(private ormRepository: Repository<Professor>) {}

  public async create({
    birth_date,
    has_pq_or_dt_sponsor,
    name,
    other_ppg_weekly_workload,
    placement,
    ppgco_weekly_workload,
    research_topic_id,
  }: IProfessorDTO) {
    const professor = this.ormRepository.create({
      birth_date: new Date(birth_date),
      has_pq_or_dt_sponsor,
      name,
      other_ppg_weekly_workload,
      placement,
      ppgco_weekly_workload,
      research_topic_id: research_topic_id,
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

  public async update(professorId: string, professorNewData: IProfessorDTO) {
    const professor = await this.ormRepository.findOne({
      where: { id: professorId },
    });

    const professorNewDataFilter = removeUndefinedKeys({
      ...professorNewData,
      birth_date: professorNewData?.birth_date
        ? new Date(professorNewData.birth_date)
        : undefined,
    });

    const updatedProfessor = {
      ...professor,
      ...professorNewDataFilter,
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
