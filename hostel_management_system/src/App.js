import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminHome from "./components/Admin/AdminHome";
import AdminEmptyContent from "./components/Admin/AdminEmptyContent";
import PageNotFound from "./components/Common/PageNotFound";
import Report from "./components/Common/Report";
// import Login from "./components/User/Login";
// import Register from "./components/User/Register";
import Complaint from "./components/Admin/Complaint";
import CreateNewComplaint from "./components/Admin/CreateNewComplaint";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminHome/>} />
          <Route path="/adminempty" element={<AdminEmptyContent/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="*" element={<PageNotFound/>} />
          <Route path="reports" element={<Report/>} />
          <Route path="/complaints" element={<Complaint/>} />
          <Route path="/complaint/new" element={<CreateNewComplaint/>} />
          {/* <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} /> */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
