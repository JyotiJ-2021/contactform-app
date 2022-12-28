import AddContact from "./components/AddContact";
import DisplayContact from "./components/DisplayContact";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import UpdateContact from "./components/UpdateContact";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DisplayContact />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/edit-contact/:id" element={<UpdateContact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;