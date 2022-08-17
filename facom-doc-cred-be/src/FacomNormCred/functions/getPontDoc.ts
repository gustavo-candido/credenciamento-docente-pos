type TRankVar = {
  NICConcluida: number;
  NPosDocSup: number;
  NMestresFor: number;
  NCoorMestDout: number;
  NDoutoresFor: number;
  NroOriMest: number;
  NroOriDout: number;
  IRestritoTot: number;
  IGeralTot: number;
  PontProdTec: number;
  CoordProjeto: number;
  PartProjeto: number;
  PQDT: number;
  NMeses: number;
};

export default function getPontDoc({
  IRestritoTot,
  IGeralTot,
  NMestresFor,
  NDoutoresFor,
  NPosDocSup,
  NMeses,
  CoordProjeto,
  NCoorMestDout,
  NICConcluida,
  NroOriDout,
  NroOriMest,
  PQDT,
  PartProjeto,
  PontProdTec,
}: TRankVar) {
  return (
    IRestritoTot +
    IGeralTot +
    NMestresFor +
    2 * NDoutoresFor +
    0.1 * NPosDocSup * NMeses +
    PontProdTec +
    0.25 * NroOriMest +
    0.5 * NroOriDout +
    0.1 * NCoorMestDout +
    0.1 * NICConcluida +
    CoordProjeto +
    0.3 * PartProjeto +
    PQDT
  );
}
