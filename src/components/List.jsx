import React from "react";

export default function List(props) {
    const date = new Date()
    let checkHour = date.getHours()
    let checkMinutes = date.getMinutes()
    return (
        <div>
            <div className="list-item">
                <div id={props.id} className="completion" onClick={props.checkClick} style={{backgroundColor: props.checked ? 'green' : 'red'}}></div>
                <p id={props.id} onClick={props.checkClick} className={`list--name ${props.checked ? 'checked' : ''}`}>{props.name}</p>
                <button onClick={props.click} className="delete-btn fa-solid fa-trash"></button>
                <p className="time">
                    {props.hours > 12 ? props.hours - 12: props.hours}:{props.minutes < 10 ? `0${props.minutes}` : props.minutes} {props.hours < 12 ? "AM" : "PM"}
                </p>
            </div>
        </div>
    )
}