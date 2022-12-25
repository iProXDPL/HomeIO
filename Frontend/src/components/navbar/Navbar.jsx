import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useEffect } from "react";

const Navbar = () => {
  const { darkMode, dispatch } = useContext(DarkModeContext);
  useEffect(()=>{
    if(darkMode===true){
      document.getElementsByClassName("iconsun")[0].style.visibility='';
      document.getElementsByClassName("iconmoon")[0].style.visibility='hidden';
    }
    else
    {
      document.getElementsByClassName("iconsun")[0].style.visibility='hidden';
      document.getElementsByClassName("iconmoon")[0].style.visibility='';
    }
  },[darkMode])
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <div className="iconbox">
            <WbSunnyIcon 
            className="iconsun"
            onClick={() => {
              dispatch({ type: "TOGGLE" })
              localStorage.setItem("darkMode",!darkMode)
            }}
            />
            <DarkModeOutlinedIcon
              className="iconmoon"
              onClick={() => {
                dispatch({ type: "TOGGLE" })
                localStorage.setItem("darkMode",!darkMode)
              }}
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
