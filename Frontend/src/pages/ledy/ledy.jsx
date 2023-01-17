import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./ledy.scss";
import "../../style/main.scss";
import FormGroup from '@mui/material/FormGroup';
import React, { useEffect, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { db } from "../../utilities/firebase";
import { onValue, ref , set } from "firebase/database";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const handleChange=(n,onoff)=>{
  let led = "/Ledy/Led"+n;
  if(onoff === true)
  {
    set(ref(db,led),false)
  }
  else{
    set(ref(db,led),true)
  }
}

const OnOFFRGB=(n,dataRGB)=>{
  let dane;
  let ledRGB = "/LedyRGB/LedRGB"+n;
  let item = Object.values(dataRGB)[n];
  if(item.OnOff === true)
  {
    dane = {
      OnOff: false,
      R:item.R,
      G:item.G,
      B:item.B,
    }
  }
  else if(item.OnOff === false)
  {
    dane = {
      OnOff: true,
      R:item.R,
      G:item.G,
      B:item.B,
    }
  }
  set(ref(db,ledRGB),dane);
}
const handleChangeR = (event,newValue,n,dataRGB) => {
  let ledRGB = "/LedyRGB/LedRGB"+n;
  let item = Object.values(dataRGB)[n];
  let dane = {
    OnOff: item.OnOff,
    R:newValue,
    G:item.G,
    B:item.B,
  }
  set(ref(db,ledRGB),dane);
};
const handleChangeG = (event,newValue,n,dataRGB) => {
  let ledRGB = "/LedyRGB/LedRGB"+n;
  let item = Object.values(dataRGB)[n];
  let dane = {
    OnOff: item.OnOff,
    R:item.R,
    G:newValue,
    B:item.B,
  }
  set(ref(db,ledRGB),dane);
};
const handleChangeB = (event,newValue,n,dataRGB) => {
  let ledRGB = "/LedyRGB/LedRGB"+n;
  let item = Object.values(dataRGB)[n];
  let dane = {
    OnOff: item.OnOff,
    R:item.R,
    G:item.G, 
    B:newValue,
  }
  set(ref(db,ledRGB),dane);
};

const Ledy = () => {
  const [dataledy,setDataledy] = useState({});
  const [dataledyRGB,setDataledyRGB] = useState({});
  useEffect(() => {
    const query = ref(db,"/Ledy");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setDataledy(data);
      }
    });
  }, []);
  useEffect(() => {
    const query = ref(db,"/LedyRGB");
    return onValue(query, (snapshot) => {
      const dataRGB = snapshot.val();
      if (snapshot.exists()) {
        setDataledyRGB(dataRGB);
        Object.keys(dataledyRGB).map((key,i)=>{
          return document.getElementsByClassName("color "+key)[0].style.backgroundColor="rgb("+Object.values(dataledyRGB)[i].R+","+Object.values(dataledyRGB)[i].G+","+Object.values(dataledyRGB)[i].B+")";
        })
      }
    });
  }, [dataledyRGB]);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="listContainer">
          {Object.keys(dataledy).map((key,i)=>
          <div key={i} className="Container">
            <h3 >Led {i}</h3>
            <div className= {key} >
            <FormGroup>
            <FormControlLabel  control={<Switch />} checked={Object.values(dataledy)[i]} onChange={()=>{handleChange(i,Object.values(dataledy)[i])}} labelPlacement="bottom" label="On/Off" />
            </FormGroup>
            </div>
          </div>
          )}
          {Object.keys(dataledyRGB).map((key,i)=>
          <div key={key} className="Container">
            <h3>Led {i} RGB</h3>
            <div className= {key} >
            <FormGroup>
            <FormControlLabel  control={<Switch />} checked={Object.values(dataledyRGB)[i].OnOff} onChange={()=>{OnOFFRGB(i,dataledyRGB)}} labelPlacement="bottom" label="On/Off" />
            </FormGroup>
            <div className= {"R "+key}>
              Red: 
              <Box sx={{ width: 200 }}>
              <Slider 
                className="RSlider"
                aria-label="Red"
                onChange={(e,val) => handleChangeR(e,val,i,dataledyRGB)}
                valueLabelDisplay="auto"
                value={Object.values(dataledyRGB)[i].R}
                max={255}
              />
              </Box>
            </div>
            <div className= {"G "+key}>
              Green:
              <Box sx={{ width: 200 }}>
              <Slider
                className="GSlider"
                aria-label="Green"
                onChange={(e,val) => handleChangeG(e,val,i,dataledyRGB)}
                valueLabelDisplay="auto"
                value={Object.values(dataledyRGB)[i].G}
                max={255}
              />
              </Box>
            </div>
            <div className= {"B "+key}>
              <Box sx={{ width: 200 }}>
                Blue:
              <Slider
                className="BSlider"
                aria-label="Blue"
                onChange={(e,val) => handleChangeB(e,val,i,dataledyRGB)}
                valueLabelDisplay="auto"
                value={Object.values(dataledyRGB)[i].B}
                max={255}
              />
              </Box>
            </div>
            <div className={"color "+key} >
            </div>
            </div>
          </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Ledy;
