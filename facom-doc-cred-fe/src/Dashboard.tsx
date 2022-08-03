import Container from "@mui/material/Container";
import { useUser } from "./user";
import Table from "./Table";
import FunctionProdBibForm from "./ProdBibForm";

export default function Dashboard() {
  return (
    <Container maxWidth="xl">
      <FunctionProdBibForm />
    </Container>
  );
}
