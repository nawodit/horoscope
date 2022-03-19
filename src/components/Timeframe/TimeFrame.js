import React from "react";

export const TimeFrame =({onTimeFrameSelected}) =>{

    const[disabled,setDisabled]=React.useState(false)

        return(
            <>
                {!disabled && <div className="grid-container">
                    {['Yesterday','Today','Tomorrow'].map((timeframes)=>(
                        <button key={timeframes} className="grid-item" 
                        disabled={disabled}
                        onClick={() =>
                        { console.log(timeframes);
                            onTimeFrameSelected(timeframes);
                        setDisabled(true);}
                        }>
                            {timeframes}
                        </button>
                    ))}
                </div>}
            </>
        )
}