import { PLACEMENTS } from "src/constants";

const validPlacement = (placement: string) => {
  return PLACEMENTS.includes(placement);
};

export default validPlacement;
