import React, { useEffect, useState } from "react";
import '../styles/BillHead.css';


function Heading(){
    const [currTime,UpdateTime] = useState(new Date());
    const [billNo,UpdateBillNo] = useState(1);
    
    useEffect(()=>{
        const tick = ()=>{
            UpdateTime(new Date());
        }
        const intervalID = setInterval(tick,1000);
        return () => clearInterval(intervalID);
    },[]);
    const formatDateTime = (date) => {
    const options_date = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
    };
    const options_time = {
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
    }
    return date.toLocaleString('en-US', options_date)+" "+ date.toLocaleString('en-US', options_time);
  };
    return(
        <div className="Heading">
            <div className="HeadingBody">
            <div className="shopname">
                <h1>Venkateshwara pathira kadai</h1>
                <h4>51,Pasupathi Street,Udumalpet</h4>    
            </div>
            <div className="date">
                <h3>Date :{formatDateTime(currTime)}</h3>
            </div>
            <div className="bill">
                <h3>Bill No:{billNo}</h3>
            </div>
            </div>
        </div>
    )
}

export default Heading;