import "./single.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Profile from "../../components/patients/profilepage/Profile";

const Single = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Profile />
      </div>
    </div>
  );
};

export default Single;
