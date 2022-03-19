import React from 'react';

const KnowHoroscope = ( {data})=>{
  console.log(data)
  return (
    <div style={{display: 'flex', flexDirection: 'column',justifyContent:'center',alignItems:'center', marginTop:'10px'}}>
      <img src={data?.image} alt="zodiac pic" width="500px" height="300px"></img>
      <div style={{width:"500px"}}>
        <h3> <span style={{color:'red'}}>Your Name :</span>  <span style={{textTransform:'capitalize'}}>{data?.name}</span></h3>
        <h3><span style={{color:'red'}}>Your Horoscope is :</span> <span style={{textTransform:'capitalize'}}>{data?.sign}</span></h3>
        <h3><span style={{color:'red'}}>Date Range :</span> {data?.date_range}</h3>
        <h3><span style={{color:'red'}}>Description :</span><br /><br />{data?.description}</h3>
      </div>
    </div>
  )
}

export default KnowHoroscope
