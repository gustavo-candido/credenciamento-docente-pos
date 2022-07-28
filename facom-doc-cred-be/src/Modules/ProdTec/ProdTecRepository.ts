import { DeepPartial, Repository } from "typeorm";
import { ProdTec } from "@typeorm/entity/ProdTec";
import removeUndefinedKeys from "@utils/removeUndefinedKeys";
import { ProdTecKind } from "@typeorm/entity/ProdTecKind";

// export interface IProdTecDTO {
//   professor_id: DeepPartial<ProdBib>;
//   prod_tec_kind_id: DeepPartial<ProdTecKind>;
//   year: number;
//   description: string;
//   quantity: number;
// }

export type ProdTecDTO = DeepPartial<ProdTec>;

class ProdTecRepository {
  constructor(private ormRepository: Repository<ProdTec>) {}

  public async create({
    professor_id,
    prod_tec_kind_id,
    year,
    description,
    quantity,
  }: ProdTecDTO) {
    const prodTec = this.ormRepository.create({
      professor_id,
      prod_tec_kind_id,
      year,
      description,
      quantity,
    });

    await this.ormRepository.save(prodTec);

    return prodTec;
  }

  public async findById(prodTecId: string) {
    const prodTec = await this.ormRepository.findOne({
      where: { id: prodTecId },
      relations: ["professor_id", "prod_tec_kind_id"],
    });
    return prodTec;
  }

  public async update(prodTecId: string, prodTecNewData: ProdTecDTO) {
    const prodTec = await this.ormRepository.findOne({
      where: { id: prodTecId },
    });

    const prodTecNewDataFiltered = removeUndefinedKeys({
      ...prodTecNewData,
    });

    const updatedProdTec = {
      ...prodTec,
      ...prodTecNewDataFiltered,
    };

    await this.ormRepository.save(updatedProdTec);
    return updatedProdTec;
  }

  public async deleteById(prodTecId: string) {
    const prodTec = await this.findById(prodTecId);

    if (prodTec) {
      await this.ormRepository.remove(prodTec);
    }

    return prodTec;
  }
}

export default ProdTecRepository;
