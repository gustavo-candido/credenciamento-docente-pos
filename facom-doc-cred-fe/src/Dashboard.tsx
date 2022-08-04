import Container from "@mui/material/Container";
import { useUser } from "./user";
import Table from "./Table";
import MentorshipForm from "./MentorshipForm";
import ProdBibForm from "./ProdBibForm";
import ProjectForm from "./ProjectForm";

export default function Dashboard() {
  return (
    <Container maxWidth="xl">
      {/* <MentorshipForm /> */}
      {/* <ProdBibForm /> */}
      <ProjectForm />
    </Container>
  );
}
