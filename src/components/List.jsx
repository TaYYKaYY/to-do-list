import React from "react";
import { useState } from "react";

export default function List(props) {
    const [checked, setChecked] = useState(false)


    function check() {
        setChecked(prevChecked => !prevChecked)
    }

    
    return (
        <div>
            <div className="list-item">
                <input type="checkbox" checked={checked} onChange={check}  id={props.id}/>
                <label for={props.id} className={`list--name ${checked && "checked"}`}>{props.name}</label>
                <button onClick={props.click} className="delete-btn fa-solid fa-trash"></button>
                <p className="time">
                    {props.hours}:{props.minutes < 10 ? `0${props.minutes}` : props.minutes} {props.hours < 12 ? "AM" : "PM"}
                </p>
            </div>
        
        </div>
    )
}