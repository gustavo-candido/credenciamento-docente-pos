import { DeepPartial, Repository } from "typeorm";
import { QualisAnais } from "@typeorm/entity/QualisAnais";
import removeUndefinedKeys from "@utils/removeUndefinedKeys";

type QualisAnaisDTO = DeepPartial<QualisAnais>;

class QualisAnaisRepository {
  constructor(private ormRepository: Repository<QualisAnais>) {}

  public async create({ name, qualis, sigla }: QualisAnaisDTO) {
    const qualisAnais = this.ormRepository.create({
      name,
      qualis,
      sigla,
    });

    await this.ormRepository.save(qualisAnais);

    return qualisAnais;
  }

  public async findAll() {
    const qualisAnais = await this.ormRepository.find();
    return qualisAnais;
  }

  public async findBySigla(qualisSigla: string) {
    const qualisAnais = await this.ormRepository.findOne({
      where: { sigla: qualisSigla },
    });
    return qualisAnais;
  }

  public async update(qualisSigla: string, qualisNewData: QualisAnaisDTO) {
    const qualis = await this.ormRepository.findOne({
      where: { sigla: qualisSigla },
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

export default QualisAnaisRepository;
