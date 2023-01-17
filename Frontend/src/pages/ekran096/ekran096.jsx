import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "../../style/main.scss";
import { db } from "../../utilities/firebase";
import { onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from 'react';
const handleChange = (event, x, y, data) => {
  let element = document.getElementsByClassName('row '+x)[0].getElementsByClassName("boxforClick "+y)[0];
  let datax = [];
  let datay = [];
  let l= data.length;
  if(l>=2){
  for (let d = 0; d < l; d = d + 2) {
    datax.push(data.data[d]);
    datay.push(data.data[d + 1]);
  }}
  if(element.style.backgroundColor === 'rgb(0, 0, 0)')
  {
    for (let pixel = 0; pixel < l; pixel=pixel+2) {
      if(data.data[pixel] === x && data.data[pixel+1] === y)
      {
        let arraydata = data.data;
        arraydata.splice(pixel,2);
        element.style.backgroundColor = 'rgb(255,255,255)';
        set(ref(db,"/096/data"),arraydata);
        if(l>=2){
        set(ref(db,"/096/length"),l-2);
        }
      }
    }
  }
  else
  {
    element.style.backgroundColor = 'rgb(0,0,0)';
    set(ref(db,"/096/data/"+l),x);
    set(ref(db,"/096/data/"+(l+1)),y);
    set(ref(db,"/096/length"),l+2);
  }
};
function btns(x, data) {
  let content = []
  for (let xd = 0; xd < 64; xd++) {
    content.push(
      <div key={xd} className={"boxforClick " + xd} onClick={(e) => { handleChange(e, x, xd, data) }}>

      </div>
    )
  }
  return content
}
function rows(data) {
  let content = []
  for (let xd = 0; xd < 128; xd++) {
    content.push(
      <div className={"row "+xd}>
            {btns(xd, data)}
      </div>
    )
  }
  return content
}
const Ekran096 = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const query = ref(db, "/096");
    return onValue(query, (snapshot) => {
      const dataxd = snapshot.val();
      if (snapshot.exists()) {
        setData(dataxd);
      }
    });
  }, []);
  useEffect(() => {
    let datax = [];
    let datay = [];
    let l = data.length;
    for (let d = 0; d < l; d = d + 2) {
      datax.push(data.data[d]);
      datay.push(data.data[d + 1]);
    }
    for (let p = 0; p < l / 2; p++) {
      let element = document.getElementsByClassName('row ' + datax[p])[0].getElementsByClassName("boxforClick " + datay[p])[0];
      element.style.backgroundColor = 'rgb(0,0,0)';
    }
  })
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="ContainerforBox">
          {rows(data)}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Ekran096;
