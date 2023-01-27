import React, { useEffect } from "react";
import { useState } from "react";
import List from "./components/List";


export default function App(){
    const [value, setValue] = useState(JSON.parse(localStorage.getItem('main')) || [])
    const [inputValue, setInputValue] = useState('')
    const [filter, setFilter] = useState('all')

    let completedArr = value.filter(obj => obj.isChecked)
        let uncompletedArr = value.filter(obj => !obj.isChecked)
    
    function check(event) {
        const {id} = event.target
        const arr = value.find(obj => obj.id === parseInt(id))
         value.forEach(item => {
            if (item === arr){
                setValue(prevValue => {
                    item.isChecked = !item.isChecked
                    return [...prevValue]
                })
            }
        })
    }

    function showText(event){
        const date = new Date()
        let {value, name} = event.target.previousSibling
        if (value === ''){
            return
        }
        setValue(prevValue => [...prevValue, {
            id: prevValue.length + 1,
            [name]: value,
            hours: date.getHours(),
            minutes:date.getMinutes(),
            isChecked: false,
        }])
        setInputValue('')
        event.target.previousSibling.focus()
    }


    function updateText(event) {
        setInputValue(event.target.value)
    }


    function deleteItem(event) {
        const {id} = event.target.parentElement.children[1]
        const arr = value.find(obj => obj.id === parseInt(id))
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

    function handleChange(event){
        const {value} = event.target
        setFilter(value)
    }

    const allNames = value.map(name => <List
        key={name.id}
        name={name.name}
        id={name.id}
        click={deleteItem}
        checkClick={check}
        hours={name.hours}
        minutes={name.minutes}
        checked={name.isChecked}
        />)
        useEffect(() =>{
            localStorage.setItem('main', JSON.stringify(value))
        }, [value])


    const completedNames = completedArr.map(item => <List
        key={item.id}
        name={item.name}
        id={item.id}
        click={deleteItem}
        checkClick={check}
        hours={item.hours}
        minutes={item.minutes}
        checked={item.isChecked}
        />)
    const uncompletedNames = uncompletedArr.map(item => <List
        key={item.id}
        name={item.name}
        id={item.id}
        click={deleteItem}
        checkClick={check}
        hours={item.hours}
        minutes={item.minutes}
        checked={item.isChecked}
            />)
    

    let filterDecider;
        if (filter === 'completed'){
            filterDecider = completedNames
        }else if (filter === 'all'){
            filterDecider = allNames
        }else{
            filterDecider = uncompletedNames
        }


    return (
        <div>
            <h1>To-Do List</h1>
        <div className="main-wrap">
            <form onSubmit={(event) => event.preventDefault()}>
                <div className="upper">
                    <div className="events">
                        <input type="text" name="name" value={inputValue} onChange={updateText} placeholder="Tasks..." autoFocus/>
                        <button className="upper-btn fa-solid fa-plus" onClick={showText} type="submit"></button>
                        {value.length > 0 && <button className="upper-btn clear" onClick={() => setValue([])}>clear</button>}
                    </div>
                    <select className="selector" name="filter" onChange={handleChange}>
                        <option value="all">all</option>
                        <option value="completed">completed</option>
                        <option value="uncompleted">uncompleted</option>
                    </select>
                </div>
                <div className="flex">
                    {value[0] ?
                    <ul>
                        <li>{filterDecider}</li>
                        <p>{filter === 'completed' && completedNames.length === 0 ? "No completed tasks" : ''}</p>
                        <p>{filter === 'uncompleted' && uncompletedNames.length === 0 ? "No uncompleted tasks" : ''}</p>
                    </ul> :
                    undefined
                    }
                </div>
            <div className="counts">
                <p className="task-counter">{value.length > 0 ? `You have ${value.length} task${value.length > 1 ? 's' : '' }` : "No tasks yet!"}</p>
                {value.length > 1 && <p className="task-counter__filtered">completed: {completedNames.length} <br></br>uncompleted: {uncompletedArr.length}</p>}
            </div>
            </form>
        </div>
        </div>
    )
}