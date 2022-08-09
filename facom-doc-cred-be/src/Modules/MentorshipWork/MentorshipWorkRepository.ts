import { DeepPartial, Repository } from "typeorm";
import removeUndefinedKeys from "@utils/removeUndefinedKeys";
import { MentorshipWork } from "@typeorm/entity/MentorshipWork";

export type MentorshipWorkDTO = DeepPartial<MentorshipWork>;
class MentorshipWorkRepository {
  constructor(private ormRepository: Repository<MentorshipWork>) {}

  public async create(mentorshipData: MentorshipWorkDTO | MentorshipWorkDTO[]) {
    //@ts-expect-error
    const mentorshipWork = this.ormRepository.create(mentorshipData);

    await this.ormRepository.save(mentorshipWork);

    return mentorshipWork;
  }

  public async findById(mentorshipWorkId: string) {
    const mentorshipWork = await this.ormRepository.findOne({
      where: { id: mentorshipWorkId },
      relations: ["professor_id"],
    });
    return mentorshipWork;
  }

  public async findByProfessor(professorId: string) {
    const mentorshipWork = await this.ormRepository.query(
      `select * from mentorship_work where professor_id = '${professorId}'`
    );
    return mentorshipWork;
  }

  public async update(
    mentorshipWorkId: string,
    mentorshipWorkNewData: MentorshipWorkDTO
  ) {
    const mentorshipWork = await this.ormRepository.findOne({
      where: { id: mentorshipWorkId },
    });

    const mentorshipWorkNewDataFiltered = removeUndefinedKeys({
      ...mentorshipWorkNewData,
    });

    const updatedMentorshipWork = {
      ...mentorshipWork,
      ...mentorshipWorkNewDataFiltered,
    };

    await this.ormRepository.save(updatedMentorshipWork);
    return updatedMentorshipWork;
  }

  public async deleteById(mentorshipWorkId: string) {
    const mentorshipWork = await this.findById(mentorshipWorkId);

    if (mentorshipWork) {
      await this.ormRepository.remove(mentorshipWork);
    }

    return mentorshipWork;
  }

  public async deleteByProfessor(professorId: string) {
    await this.ormRepository.query(
      `delete from mentorship_work where professor_id = '${professorId}'`
    );
  }
}

export default MentorshipWorkRepository;
