import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import loggedRoute from "./loggedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="foo" element={loggedRoute(<Foo />)} />
      <Route path="*" element={<div>Error </div>} />
    </Routes>
  );
}

function Foo() {
  return <div>Foo</div>;
}

function Bar() {
  return <div>Bar</div>;
}

export default App;
