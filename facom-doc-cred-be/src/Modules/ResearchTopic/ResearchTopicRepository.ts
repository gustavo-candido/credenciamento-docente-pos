import { Repository } from "typeorm";
import { ResearchTopic } from "@typeorm/entity/ResearchTopic";

export interface IResearchTopicDTO {
  topic: string;
}

class ResearchTopicRepository {
  constructor(private ormRepository: Repository<ResearchTopic>) {}

  public async create({ topic }: IResearchTopicDTO) {
    const researchTopic = this.ormRepository.create({
      topic,
    });

    await this.ormRepository.save(researchTopic);

    return researchTopic;
  }

  public async findById(researchTopicId: string) {
    try {
      const researchTopic = await this.ormRepository.findOneByOrFail({
        id: researchTopicId,
      });
      return researchTopic;
    } catch (e) {
      return null;
    }
  }

  public async findAll() {
    try {
      const researchTopic = await this.ormRepository.find();
      return researchTopic;
    } catch (e) {
      return null;
    }
  }

  public async findByName(topic: string) {
    const researchTopic = await this.ormRepository.findOneBy({
      topic,
    });

    return researchTopic;
  }

  public async update(
    researchTopicId: string,
    researchTopicNewData: IResearchTopicDTO
  ) {
    const researchTopic = await this.findById(researchTopicId);

    const updatedResearchTopic = {
      ...researchTopic,
      ...researchTopicNewData,
    };

    this.ormRepository.save(updatedResearchTopic);

    return updatedResearchTopic;
  }

  public async deleteById(researchTopicId: string) {
    const researchTopic = await this.findById(researchTopicId);

    if (researchTopic) {
      await this.ormRepository.remove(researchTopic);
    }

    return researchTopic;
  }
}

export default ResearchTopicRepository;
