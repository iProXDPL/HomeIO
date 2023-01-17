import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "../../style/main.scss";
import TextField from '@mui/material/TextField';
import { db } from "../../utilities/firebase";
import { onValue, ref , set } from "firebase/database";
import React, { useEffect, useState } from 'react';
const handleChange = (e,i)=>{
  if(e.target.value.length>16){
    e.target.value=e.target.value.splice(0,16);
  }
  if(i===1){
  set(ref(db,"/16x2/First"),e.target.value)
  }
  else if(i===2)
  {
  set(ref(db,"/16x2/Second"),e.target.value)
  }
}
const Ekran16x2 = () => {
  const [data,setData] = useState({});
  useEffect(() => {
    const query = ref(db,"/16x2");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setData(data);
      }
    });
  }, []);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="listContainer">
          <div className="Container">
            <h3>Ekran 16x2</h3>
            Pierwsza linia:
            <TextField 
            value={data.First}
            onChange={(e)=>{handleChange(e,1)}}
            id="firstline" 
            variant="outlined" 
            />
            Druga linia:
            <TextField 
            value={data.Second}
            onChange={(e)=>{handleChange(e,2)}}
            id="secondline" 
            variant="outlined" 
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Ekran16x2;
