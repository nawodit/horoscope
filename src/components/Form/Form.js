import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { TimeFrame } from '../Timeframe/TimeFrame';
import { SelectSign } from '../SelectSign/SelectSign';
import './Form.css'
import KnowHoroscope from '../KnowHoroscope/KnowHoroscope';
import axios  from 'axios';

const Form =() => {
    const [name, setName] = useState();
    const [email, setEmail] = useState("");
    const [selectedSign,setSelectedSign] = useState();
    const [selectedTimeFrame,setSelectedTimeFrame] = useState();
    const [horoscope,setHoroscope] = useState([]);
    const [data, setData] = useState();
    const [showForm, setShowForm] = useState(true);
    const [image, setImage] = useState({
        aries:'https://wallpaperaccess.com/full/1113816.jpg',
        taurus:'https://wallpaperaccess.com/full/5552503.jpg',
        gemini:'https://wallpaperaccess.com/full/2575673.jpg',
        cancer:'https://wallpaperaccess.com/full/3389884.jpg',
        leo:'https://wallpaperaccess.com/full/1840957.jpg',
        virgo:'https://wallpaperaccess.com/full/1114003.jpg',
        libra:'https://wallpaperaccess.com/full/3464636.jpg',
        scorpio:'https://wallpaperaccess.com/full/4487157.jpg',
        sagittarius:'https://wallpaperaccess.com/full/6229635.jpg',
        capricorn:'https://wallpaperaccess.com/full/1114185.jpg',
        aquarius:'https://wallpaperaccess.com/full/5706664.jpg',
        pisces:'https://wallpaperaccess.com/full/1114334.jpg'
    })

    useEffect(()=>{
        let item = JSON.parse(localStorage.getItem('horoscope'))
        // console.log(item)
        if(item){
            setData(item)
            setShowForm(false)
        }
       
    },[])

    const reset =() => {
        setSelectedSign(null);
        setSelectedTimeFrame(null);
        setName();
        setEmail();
        setData(null);
        setHoroscope(null);
        setShowForm(true)
        localStorage.clear()
    };
   
    async function handleSubmit(e) {

        e.preventDefault();
        const options = {
            method: 'POST',
            url: 'https://sameer-kumar-aztro-v1.p.rapidapi.com/',
            params: {sign: selectedSign, day: selectedTimeFrame},
            headers: {
                'x-rapidapi-host': 'sameer-kumar-aztro-v1.p.rapidapi.com',
                'x-rapidapi-key': '3a9e3d17f3msh7bc4f2e9f4a8eadp169278jsnafa55ace3863'
            }
        };

        await axios.request(options).then(function (response) {
	        // console.log(response.data);
            let range=response.data.date_range.split('-');
            let chosenDate = new Date(response.data.current_date)
            let minDate= new Date(range[0])
            let maxDate= new Date(range[1])
            let color='blue';
            if(minDate>=chosenDate){
                
                color='green'
            }
            console.log(minDate<=chosenDate)
            let dummy = {
                ...response.data,
                sign:selectedSign,
                day:selectedTimeFrame,
                name:name,
                image:image[selectedSign],
                bgColor:color
            }
            localStorage.setItem('horoscope',JSON.stringify(dummy))
            setData(dummy)
            setShowForm(false)
        }).catch(function (error) {
	    console.error(error);
        });
    }
    return (
        <div className='form-demo'>
        {showForm ? (
            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center text-xl">
                        Enter Your Details
                    </h5>
                    <form className="p-fluid" onSubmit={(e)=> handleSubmit(e)}>
                        <div className="field">
                            <span className="p-float-label">
                                <InputText 
                                    placeholder="Name"
                                    type="text"
                                    value={name}
                                    onChange={(e)=> setName(e.target.value)}
                                    required
                                />
                            </span>
                        </div>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e)=> setEmail(e.target.value)}
                                    required 
                                />
                            </span>
                        </div>
                        {!selectedSign && (<SelectSign  onSignSelected={setSelectedSign}/>)}
                        {selectedSign && <center><h2 className="cap">You Want to Know Your <span>{selectedSign}</span> Horoscope For</h2></center> }
                        <center><h2 className="cen">{selectedTimeFrame}</h2></center>
                        {selectedSign && (<TimeFrame  onTimeFrameSelected={setSelectedTimeFrame}/>)}
                        <Button type="reset" label="Reset" onClick={reset} className="mt-2" />
                        {selectedTimeFrame &&<Button  type="submit" label="Submit" className="mt-2"   />}
                    </form>
                </div>
            </div>
        ):(
            <div style={{display: 'flex', flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
                <KnowHoroscope  data={data} />
                <Button type="reset" label="Reset" onClick={reset} className="mt-2" />
            </div>
        )}
        </div>
    );
};
export default Form;                 