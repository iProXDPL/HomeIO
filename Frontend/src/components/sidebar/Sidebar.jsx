import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Link } from "react-router-dom";
import { UserAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = UserAuth();

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Home IO</span>
        </Link>
      </div>
      <div className="center">
        <ul>
          <p className="title">Strona Główne</p>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">Sterowanie</p>
          <Link to="/ledy" style={{ textDecoration: "none" }}>
          <li>
            <InsertChartIcon className="icon" />
            <span>Ledy</span>
          </li>
          </Link>

          <Link to="/ekran16x2" style={{ textDecoration: "none" }}>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Ekran 16x2</span>
          </li>
          </Link>

          <Link to="/ekran096" style={{ textDecoration: "none" }}>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Ekran 0.96</span>
            
          </li>
          </Link>
          <Link to="/wykres" style={{ textDecoration: "none" }}>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Wykresy</span>
            
          </li>
          </Link>
          <p className="title">Użytkownik</p>
          <li onClick ={()=>{logout()}}>
            <ExitToAppIcon className="icon" />
            <span>Wyloguj</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
