import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/ab" element={<Bar />} />
      <Route path="/abc" element={<Foo />} />
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
