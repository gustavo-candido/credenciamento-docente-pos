import { DeepPartial, Repository } from "typeorm";
import { ProdBib } from "@typeorm/entity/ProdBib";
import removeUndefinedKeys from "@utils/removeUndefinedKeys";

export interface IProdBibDTO {
  professor_id: DeepPartial<ProdBib>;
  issn_or_sigla: string;
  year: number;
  title: string;
  event_name: string;
}
class ProdBibRepository {
  constructor(private ormRepository: Repository<ProdBib>) {}

  public async create({
    professor_id,
    issn_or_sigla,
    year,
    title,
    event_name,
  }: IProdBibDTO) {
    const prodBib = this.ormRepository.create({
      professor_id,
      issn_or_sigla,
      year,
      title,
      event_name,
    });

    await this.ormRepository.save(prodBib);

    return prodBib;
  }

  public async findById(prodBibId: string) {
    const prodBib = await this.ormRepository.findOne({
      where: { id: prodBibId },
      relations: ["professor_id"],
    });
    return prodBib;
  }

  public async update(prodBibId: string, prodBibNewData: IProdBibDTO) {
    const prodBib = await this.ormRepository.findOne({
      where: { id: prodBibId },
    });

    const prodBibNewDataFiltered = removeUndefinedKeys({
      ...prodBibNewData,
    });

    const updatedProdBib = {
      ...prodBib,
      ...prodBibNewDataFiltered,
    };

    await this.ormRepository.save(updatedProdBib);
    return updatedProdBib;
  }

  public async deleteById(prodBibId: string) {
    const prodBib = await this.findById(prodBibId);

    if (prodBib) {
      await this.ormRepository.remove(prodBib);
    }

    return prodBib;
  }
}

export default ProdBibRepository;
