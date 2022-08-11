import { DeepPartial, Repository } from "typeorm";
import { ProdTec } from "@typeorm/entity/ProdTec";
import removeUndefinedKeys from "@utils/removeUndefinedKeys";

export type ProdTecDTO = DeepPartial<ProdTec>;

class ProdTecRepository {
  constructor(private ormRepository: Repository<ProdTec>) {}

  public async create(prodTecData: ProdTecDTO | ProdTecDTO[]) {
    //@ts-expect-error
    const prodTec = this.ormRepository.create(prodTecData);

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

  public async findByProfessor(professorId: string) {
    const prodTec = await this.ormRepository.query(
      `select * from prod_tec where professor_id = '${professorId}'`
    );
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

  public async deleteByProfessor(professorId: string) {
    await this.ormRepository.query(
      `delete from prod_tec where professor_id = '${professorId}'`
    );
  }
}

export default ProdTecRepository;
