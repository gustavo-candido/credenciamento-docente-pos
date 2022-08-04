import Container from "@mui/material/Container";
import { useUser } from "./user";
import Table from "./Table";
import MentorshipForm from "./MentorshipForm";

export default function Dashboard() {
  return (
    <Container maxWidth="xl">
      <MentorshipForm />
    </Container>
  );
}
