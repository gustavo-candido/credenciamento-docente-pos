import { ProdTecDTO } from "../../Modules/ProdTec/ProdTecRepository";
import { ProdTecKindDTO } from "../../Modules/ProdTecKind/ProdTecKindRepository";

export default function getPontProdTec(
  prodTec: ProdTecDTO[],
  allKinds: ProdTecKindDTO[]
) {
  const kind = allKinds.reduce(
    (obj: Record<string, number>, item): Record<string, number> => {
      return !item?.id || !item.score
        ? obj
        : { ...obj, ...{ [item.id]: parseFloat(item.score) } };
    },
    {}
  );

  return parseFloat(
    prodTec
      .reduce((acc, item) => {
        return !item?.prod_tec_kind_id || !item?.quantity
          ? acc
          : acc + item.quantity * kind[item.prod_tec_kind_id];
      }, 0)
      .toFixed(2)
  );
}
