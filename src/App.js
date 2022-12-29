import AddContact from "./components/AddContact";
import DisplayContact from "./components/DisplayContact";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UpdateContact from "./components/UpdateContact";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="contactform-app">
        <Routes>
          <Route exact path="/contactform-app" element={<DisplayContact />} />
          <Route path="/contactform-app/add-contact" element={<AddContact />} />
          <Route
            path="/contactform-app/edit-contact/:id"
            element={<UpdateContact />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
