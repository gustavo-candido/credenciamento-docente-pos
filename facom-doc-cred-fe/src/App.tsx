import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import loggedRoute from "./loggedRoute";
import Dashboard from "./Dashboard";
import GlobalStyle from "./global";
import Upload from "./Upload";
import Header from "./Header";
import ProjectForm from "./ProjectForm";
import ProdBibForm from "./ProdBibForm";
import MentorshipForm from "./MentorshipForm";
import { useUser } from "./user";
import Perfil from "./Perfil";
import ProdTecForm from "./ProdTecForm";
import SignIn from "./SignIn";
import HeaderAdmin from "./HeaderAdmin";
import DashboardAdmin from "./DashboardAdmin";
import ResearchTopics from "./ResearchTopics";
import QualisPer from "./QualisPer";
import QualisAnais from "./QualisAnais";

function App() {
  const { user } = useUser();

  console.log(user);
  return (
    <>
      <GlobalStyle />

      {user?.id && (user?.professorId ? <Header /> : <HeaderAdmin />)}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-in" element={<SignIn />} />

        {!user.isAdm && user.professorId && (
          <>
            <Route path="/" element={loggedRoute(<Dashboard />)} />
            <Route path="/perfil" element={loggedRoute(<Perfil />)} />
            <Route path="/upload" element={loggedRoute(<Upload />)} />
            <Route path="/projetos" element={loggedRoute(<ProjectForm />)} />
            <Route path="/prob-bib" element={loggedRoute(<ProdBibForm />)} />
            <Route path="/prob-tec" element={loggedRoute(<ProdTecForm />)} />
            <Route
              path="/orientacao"
              element={loggedRoute(<MentorshipForm />)}
            />
          </>
        )}

        {user.isAdm && !user.professorId && (
          <>
            <Route path="/" element={loggedRoute(<DashboardAdmin />)} />
            <Route
              path="/linhas-de-pesquisa"
              element={loggedRoute(<ResearchTopics />)}
            />
            <Route path="/qualis-per" element={loggedRoute(<QualisPer />)} />
            <Route
              path="/qualis-anais"
              element={loggedRoute(<QualisAnais />)}
            />
          </>
        )}

        <Route path="*" element={loggedRoute(<div> Error </div>)} />
      </Routes>
    </>
  );
}
export default App;
