import isQualisRestrict from "./isQualisRestrict";
import qualisScore from "./qualisScore";

const qualisScoreRestrict = (qualis: string): number =>
  isQualisRestrict(qualis) ? qualisScore(qualis) : 0;

export default qualisScoreRestrict;
