import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "../../style/main.scss";
import { db } from "../../utilities/firebase";
import { onValue, ref , set } from "firebase/database";
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
    }
};

const handleChange = (val) => {
    if(val===false)
    {
        set(ref(db,"/Pot/labels"),[]);
        set(ref(db,"/Pot/data"),[]);
        set(ref(db,"/Pot/onoff"),true);
    }
    else if(val===true)
    {
        set(ref(db,"/Pot/labels"),[]);
        set(ref(db,"/Pot/data"),[]);
        set(ref(db,"/Pot/onoff"),false);
    }
};

const Wykres = () => {
    const [dbdata,setDatadb] = useState([0]);
    const [dblabels,setLabelsdb] = useState([0]);
    const [dbonoff,setOnoffdb] = useState(false);
    useEffect(() => {
        const query = ref(db,"/Pot");
        return onValue(query, (snapshot) => {
        const data = snapshot.val();
        if (snapshot.exists()) {
            setLabelsdb(data.labels);
            setDatadb(data.data)
            setOnoffdb(data.onoff)
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
                        <div className="title">
                            <h3>Wykres 1</h3>
                        </div>
                        <div className="stopstartbox">
                            <Button variant="contained" size="large" color={dbonoff ? "error" : "success"} onClick={()=>{handleChange(dbonoff)}}>{dbonoff ? "Stop" : "Start"}</Button>
                        </div>
                        <div className="wykres">
                        <Line 
                            options={options} 
                            data={{
                                labels: dblabels,
                                datasets: [
                                    {
                                        label: "Wartość rezystora",
                                        data: dbdata,
                                        borderColor: "rgb(255, 99, 132)",
                                        backgroundColor: "rgba(255, 99, 132, 0.5)"
                                    }
                                ]
                            }}
                            width={1400} 
                            height={250}
                             />   
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Wykres;
