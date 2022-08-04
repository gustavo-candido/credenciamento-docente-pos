import Container from "@mui/material/Container";
import { useUser } from "./user";
import Table from "./Table";
import MentorshipForm from "./MentorshipForm";
import ProdBibForm from "./ProdBibForm";

export default function Dashboard() {
  return (
    <Container maxWidth="xl">
      {/* <MentorshipForm /> */}
      <ProdBibForm />
    </Container>
  );
}
