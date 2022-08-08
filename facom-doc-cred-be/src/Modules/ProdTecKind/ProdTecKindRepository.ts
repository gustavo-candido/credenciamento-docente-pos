import { DeepPartial, Repository } from "typeorm";
import removeUndefinedKeys from "@utils/removeUndefinedKeys";
import { ProdTecKind } from "@typeorm/entity/ProdTecKind";

export type ProdTecKindDTO = DeepPartial<ProdTecKind>;

class ProdTecKindRepository {
  constructor(private ormRepository: Repository<ProdTecKind>) {}

  public async create({ kind, score }: ProdTecKindDTO) {
    const prodTecKind = this.ormRepository.create({
      kind,
      score,
    });

    await this.ormRepository.save(prodTecKind);

    return prodTecKind;
  }

  public async findById(prodTecKindId: string) {
    const prodTecKind = await this.ormRepository.findOne({
      where: { id: prodTecKindId },
    });
    return prodTecKind;
  }

  public async findByKind(kind: string) {
    const prodTecKind = await this.ormRepository.findOne({
      where: { kind },
    });
    return prodTecKind;
  }

  public async update(
    prodTecKindId: string,
    prodTecKindNewData: ProdTecKindDTO
  ) {
    const prodTecKind = await this.ormRepository.findOne({
      where: { id: prodTecKindId },
    });

    const prodTecKindNewDataFiltered = removeUndefinedKeys({
      ...prodTecKindNewData,
    });

    const updatedProdTecKind = {
      ...prodTecKind,
      ...prodTecKindNewDataFiltered,
    };

    await this.ormRepository.save(updatedProdTecKind);
    return updatedProdTecKind;
  }

  public async deleteById(prodTecKindId: string) {
    const prodTecKind = await this.findById(prodTecKindId);

    if (prodTecKind) {
      await this.ormRepository.remove(prodTecKind);
    }

    return prodTecKind;
  }
}

export default ProdTecKindRepository;
