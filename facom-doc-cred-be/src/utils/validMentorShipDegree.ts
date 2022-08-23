import { MENTORSHIP_DEGREE } from "../constants";

const validMentorShipDegree = (degree: MENTORSHIP_DEGREE) => {
  const array = Object.values(MENTORSHIP_DEGREE);
  return array.includes(degree);
};

export default validMentorShipDegree;
