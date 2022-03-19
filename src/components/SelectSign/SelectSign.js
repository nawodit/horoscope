import { useState , useEffect } from "react";
import { getSigns } from "../../services/api";

export const SelectSign = ({ onSignSelected }) => {
    const [sign,setSign] = useState([]);
    useEffect(()=>{
        getSigns().then(setSign);
    },[]);
    return(
        <>
            <center className="horo-text">Select Your Horoscope</center>
            <div className="filed">
                <span className="p-float-label">
                    <div className="grid-container">
                        {sign.map((sign)=>(
                            <button key={sign} className="grid-item" onClick={() =>{
                                    console.log(sign);
                                    onSignSelected(sign)
                            } }>{sign}</button>
                        ))}
                    </div>
                </span>
            </div><br/>
        </>                                
    )
}