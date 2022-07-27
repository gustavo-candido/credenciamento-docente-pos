import { MENTORSHIP_ROLES } from "src/constants";

const validMentorShipRole = (role: string) => {
  return MENTORSHIP_ROLES.includes(role);
};

export default validMentorShipRole;
