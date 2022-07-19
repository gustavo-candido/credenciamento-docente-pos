import { MENTORSHIP_DEGREE } from "src/constants";

const validMentorShipDegree = (degree: string) => {
  return MENTORSHIP_DEGREE.includes(degree);
};

export default validMentorShipDegree;
