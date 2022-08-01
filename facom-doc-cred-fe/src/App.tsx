import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import loggedRoute from "./loggedRoute";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={loggedRoute(<Dashboard />)} />

      <Route path="*" element={<div>Error </div>} />
    </Routes>
  );
}
export default App;
