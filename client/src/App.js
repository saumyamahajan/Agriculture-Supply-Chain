import './App.css';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Farmer from './pages/Farmer';
import Profile from './pages/Profile';
import FarmerEdit from './pages/FarmerEdit';
import ActivityEdit from './pages/ActivityEdit';
import AssetEdit from './pages/AssetEdit';
import PeopleEdit from './pages/PeopleEdit';
import MaterialConsumedEdit from './pages/MaterialConsumedEdit';
import Contact from './pages/Contact';
import Test from './pages/Test';
import Test1 from './pages/Test1';
import FileUpload from './pages/FileUpload';
import Login from './pages/Login';

function App() {
  sessionStorage.setItem("userType", 'user');
  sessionStorage.setItem("_id", "");
  return (
    <div>
     <Navbar/>

     <Router>
          <Routes>
            <Route path='/' exact={true} element={<Home/>}/>
            <Route path='home' exact={true} element={<Home/>}/>
            <Route path='login/:type' element={<Login/>}/>
            <Route path='about' exact={true} element={<About/>}/>
            <Route path='contact' exact={true} element={<Contact/>}/>
            <Route path='test' exact={true} element={<Test/>}/>
            <Route path='test1' exact={true} element={<Test1/>}/>
            <Route path='fileupload' exact={true} element={<FileUpload/>}/>
            <Route path='farmer' element={<Farmer/>}/>
            <Route path='farmer/:id' element={<FarmerEdit/>}/>
            <Route path='farmerProfile/:id' element={<Profile/>}/>
            <Route path='activity/:farmerId/:id' element={<ActivityEdit/>}/>
            <Route path='activity/people/:farmerId/:activityId/:peopleId' element={<PeopleEdit/>}/>
            <Route path='activity/asset/:farmerId/:activityId/:assetId' element={<AssetEdit/>}/>
            <Route path='activity/materialConsumed/:farmerId/:activityId/:materialConsumedId' element={<MaterialConsumedEdit/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
