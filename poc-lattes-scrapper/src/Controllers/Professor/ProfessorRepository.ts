import { Repository } from "typeorm";
import { Professor } from "@typeorm/entity/Professor";

export interface IProfessorDTO {
  name: string;
  birth_date: Date;
}

class ProfessorRepository {
  constructor(private ormRepository: Repository<Professor>) {}

  public async create({ name, birth_date }: IProfessorDTO) {
    const professor = this.ormRepository.create({
      name,
      birth_date: new Date(birth_date),
    });

    await this.ormRepository.save(professor);

    return professor;
  }

  public async findById(professorId: string) {
    try {
      const professor = await this.ormRepository.findOneByOrFail({
        id: professorId,
      });
      return professor;
    } catch (e) {
      return null;
    }
  }

  public async findByName(professorName: string) {
    const professor = await this.ormRepository.findOneBy({
      name: professorName,
    });

    return professor;
  }

  public async update(professorId: string, professorNewData: IProfessorDTO) {
    const professor = await this.findById(professorId);

    const updatedProfessor = {
      ...professor,
      ...professorNewData,
    };

    this.ormRepository.save(updatedProfessor);

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
