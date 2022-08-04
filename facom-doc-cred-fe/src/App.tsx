import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import loggedRoute from "./loggedRoute";
import Dashboard from "./Dashboard";
import GlobalStyle from "./global";
import Upload from "./Upload";
import Header from "./Header";
import { Container } from "@mui/system";
import ProjectForm from "./ProjectForm";
import ProdBibForm from "./ProdBibForm";
import MentorshipForm from "./MentorshipForm";

function App() {
  return (
    <>
      <GlobalStyle />

      <Header />

      <div style={{ marginTop: "64px" }}>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={loggedRoute(<Dashboard />)} />
          <Route path="/upload" element={loggedRoute(<Upload />)} />
          <Route path="/projetos" element={loggedRoute(<ProjectForm />)} />
          <Route path="/prob-bib" element={loggedRoute(<ProdBibForm />)} />
          <Route path="/mentoria" element={loggedRoute(<MentorshipForm />)} />

          <Route path="*" element={<div>Error </div>} />
        </Routes>
      </div>
    </>
  );
}
export default App;
