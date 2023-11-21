import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/patients/datatable/Datatable";
import Sidebar from "../../components/sidebar/Sidebar";
import "./list.scss";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  );
};

export default List;
