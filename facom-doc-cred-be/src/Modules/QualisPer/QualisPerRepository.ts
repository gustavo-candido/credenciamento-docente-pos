import { DeepPartial, Repository } from "typeorm";
import { QualisPer } from "@typeorm/entity/QualisPer";
import removeUndefinedKeys from "@utils/removeUndefinedKeys";

type QualisPerDTO = DeepPartial<QualisPer>;

class QualisPerRepository {
  constructor(private ormRepository: Repository<QualisPer>) {}

  public async create({ title, qualis, issn }: QualisPerDTO) {
    const qualisPer = this.ormRepository.create({
      title,
      qualis,
      issn,
    });

    await this.ormRepository.save(qualisPer);

    return qualisPer;
  }

  public async findAll() {
    const qualisPer = await this.ormRepository.find();
    return qualisPer;
  }

  public async findByISSN(qualisISSN: string) {
    const qualisPer = await this.ormRepository.findOne({
      where: { issn: qualisISSN },
    });
    return qualisPer;
  }

  public async update(qualisISSN: string, qualisNewData: QualisPerDTO) {
    const qualis = await this.ormRepository.findOne({
      where: { issn: qualisISSN },
    });

    const qualisNewDataFiltered = removeUndefinedKeys({
      ...qualisNewData,
    });

    const updatedQualis = {
      ...qualis,
      ...qualisNewDataFiltered,
    };

    await this.ormRepository.save(updatedQualis);
    return updatedQualis;
  }
}

export default QualisPerRepository;
