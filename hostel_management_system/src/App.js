import { BrowserRouter, Routes, Route } from "react-router-dom";


import AdminHome from "./components/Admin/AdminHome";
import AdminEmptyContent from "./components/Admin/AdminEmptyContent";
import PageNotFound from "./components/Common/PageNotFound";
import Report from "./components/Common/Report";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Complaint from "./components/Admin/Complaint";
import Asset from "./components/Admin/Asset";
import AddAsset from "./components/Admin/AddAsset";
import CreateNewComplaint from "./components/Admin/CreateNewComplaint";


//maintains
import Maintains from "./components/Maintains/Maintains";
import AddMaintaince from "./components/Maintains/AddMaintaince";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>          
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<AdminHome/>} />
          <Route path="/adminempty" element={<AdminEmptyContent/>} />
          
          <Route path="reports" element={<Report/>} />
          <Route path="/complaints" element={<Complaint/>} />

          <Route path="/complaint/create" element={<CreateNewComplaint/>} />
          <Route path="/asset" element={<Asset/>} />
          <Route path="/addasset" element={<AddAsset/>} />


          {/* maintains */}
          <Route path="/maintains" element={<Maintains />} />
          <Route path="/addmaintaince" element={<AddMaintaince />} />

          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
