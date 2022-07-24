import { DeepPartial, Repository } from "typeorm";
import { MentorshipWork } from "@typeorm/entity/MentorshipWork";
import removeUndefinedKeys from "@utils/removeUndefinedKeys";

export interface IMentorshipWorkDTO {
  professor_id: DeepPartial<MentorshipWork>;
  is_concluded: boolean;
  role: string;
  year: number;
  title: string;
  degree: string;
  student_name: string;
  sponsor_code?: string;
  sponsor_name?: string;
  nmonths?: number;
}
class MentorshipWorkRepository {
  constructor(private ormRepository: Repository<MentorshipWork>) {}

  public async create({
    professor_id,
    is_concluded,
    role,
    year,
    title,
    degree,
    student_name,
    sponsor_code,
    sponsor_name,
    nmonths,
  }: IMentorshipWorkDTO) {
    const mentorshipWork = this.ormRepository.create({
      professor_id,
      is_concluded,
      role,
      year,
      title,
      degree,
      student_name,
      sponsor_code,
      sponsor_name,
      nmonths,
    });

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

  public async update(
    mentorshipWorkId: string,
    mentorshipWorkNewData: IMentorshipWorkDTO
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
}

export default MentorshipWorkRepository;
