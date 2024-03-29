import AddContact from "./components/AddContact";
import DisplayContact from "./components/DisplayContact";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UpdateContact from "./components/UpdateContact";
import Test from "./components/test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<DisplayContact />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/edit-contact/:id" element={<UpdateContact />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
