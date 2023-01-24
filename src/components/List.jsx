import React, {useState} from "react";

export default function List(props) {
    const [checked, setChecked] = useState(false)
    function check() {
        setChecked(prevCheck => !prevCheck)
    }
    return (
        <div>
            <div className="list-item">
                {/* <input type="checkbox" id={props.id} checked={checked} onChange={check}/> */}
                <div className="completion" onClick={check} style={{backgroundColor: checked ? 'green' : 'red'}}></div>
                <p htmlFor={props.id} className={`list--name ${checked && 'checked'}`} onClick={check}>{props.name}</p>
                <button onClick={props.click} className="delete-btn fa-solid fa-trash"></button>
                <p className="time">
                    {props.hours}:{props.minutes < 10 ? `0${props.minutes}` : props.minutes} {props.hours < 12 ? "AM" : "PM"}
                </p>
            </div>
        </div>
    )
}