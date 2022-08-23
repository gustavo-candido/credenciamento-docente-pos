import { PLACEMENTS } from "../constants";

const validPlacement = (placement: string) => {
  return PLACEMENTS.includes(placement);
};

export default validPlacement;
