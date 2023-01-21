import React from "react";
import { useState } from "react";
import List from "./components/List";


// tomorrow work on localStorage and filtering completed listItems


export default function App(){
    const [value, setValue] = useState([])
    const [inputValue, setInputValue] = useState('')


    function showText(event){
        const date = new Date()
        let {value, name} = event.target.previousSibling
        if (value === ''){
            return
        }
        setValue(prevValue => [...prevValue, {id: prevValue.length + 1, [name]: value, hours: date.getHours(), minutes:date.getMinutes()}])
        setInputValue('')
        event.target.previousSibling.focus()
    }


    function updateText(event) {
        setInputValue(event.target.value)
    }


    function deleteItem(event) {
        const {textContent} = event.target.parentElement.children[1]    
        const arr = value.find(obj => obj.name === textContent)
        value.forEach(item => {
            if (item === arr){
                const index = value.findIndex(e => e === item)
                setValue(prevValue => {
                    prevValue.splice(index, 1)
                    return [...prevValue]
                })
            }
        })
    }


    const allNames = value.map(name => <List 
        key={name.id}
        name={name.name}
        id={name.id}
        click={deleteItem}
        hours={name.hours}
        minutes={name.minutes}
        />)

        
    return (
        <form onSubmit={(event) => event.preventDefault()}>
            <h1>To-Do List</h1>
            <div className="upper">
                <div>
                    <input type="text" name="name" value={inputValue} onChange={updateText} placeholder="Tasks..." autoFocus/>
                    <button className="upper-btn fa-solid fa-plus" onClick={showText} type="submit"></button>
                    {value.length > 0 && <button className="upper-btn clear" onClick={() => setValue([])}>clear all</button>}
                </div>
                {value.length > 0 && <p className="counter">You have {value.length} task{value.length > 1 ? 's' : ''}</p>}
            </div>
            <div className="flex">
                {value[0] ? 
                 <ul>
                        <li>{allNames}</li>    
                    </ul> :
                    <p>No Tasks Yet!</p>
             }
            </div>
        </form>
    )
}