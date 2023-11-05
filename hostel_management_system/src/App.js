import { BrowserRouter, Routes, Route } from "react-router-dom";


//users
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";
import EditUser from "./components/User/EditUser";




import AdminHome from "./components/Admin/AdminHome";
import AdminEmptyContent from "./components/Admin/AdminEmptyContent";
import PageNotFound from "./components/Common/PageNotFound";

import Complaint from "./components/Admin/Complaint";
import Asset from "./components/Admin/Asset";
import AddAsset from "./components/Admin/AddAsset";
import UpdateAsset from "./components/Admin/UpdateAsset";
import CreateNewComplaint from "./components/Admin/CreateNewComplaint";
import EditComplaint from "./components/Admin/EditComplaint";
import ShowComplaint from "./components/Admin/ShowComplaint";


//reports
import Report from "./components/Reports/Report";


//maintains
import Maintains from "./components/Maintains/Maintains";
import AddMaintaince from "./components/Maintains/AddMaintaince";
import EditMaintaince from "./components/Maintains/EditMaintaince";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* users           */}
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/editprofile/:id" element={<EditUser/>} />
          <Route path="/dashboard" element={<AdminHome/>} />


          <Route path="/adminempty" element={<AdminEmptyContent/>} />
          

          <Route path="reports" element={<Report/>} />


          {/* complaints */}
          <Route path="/complaints" element={<Complaint/>} />
          <Route path="/complaint/create" element={<CreateNewComplaint/>} />
          <Route path="/complaint/edit/:id" element={<EditComplaint/>} />
          <Route path="/complaint/show/:id" element={<ShowComplaint/>} />


          <Route path="/asset" element={<Asset/>} />
          <Route path="/addasset" element={<AddAsset/>} />
          <Route path="/updateasset/:assetId" element={<UpdateAsset />} />


          {/* maintains */}
          <Route path="/maintains" element={<Maintains />} />
          <Route path="/addmaintaince" element={<AddMaintaince />} />
          <Route path="/editmaintaince/:id" element={<EditMaintaince />} />

          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
