import { DeepPartial, Repository } from "typeorm";
import { ProdBib } from "@typeorm/entity/ProdBib";
import removeUndefinedKeys from "@utils/removeUndefinedKeys";

export type ProdBibDTO = DeepPartial<ProdBib>;

class ProdBibRepository {
  constructor(private ormRepository: Repository<ProdBib>) {}

  public async create(prodBibData: ProdBibDTO | ProdBibDTO[]) {
    //@ts-expect-error
    const prodBib = this.ormRepository.create(prodBibData);

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

  public async findByProfessor(professorId: string) {
    const prodBib = await this.ormRepository.query(
      `select * from prod_bib where professor_id = '${professorId}'`
    );
    return prodBib;
  }

  public async update(prodBibId: string, prodBibNewData: ProdBibDTO) {
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

  public async deleteByProfessor(professorId: string) {
    await this.ormRepository.query(
      `delete prod_bib where professor_id = '${professorId}'`
    );
  }
}

export default ProdBibRepository;
