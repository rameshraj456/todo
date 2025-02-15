import React, { useEffect, useState } from 'react'
import Task from './Task';
import NewTask from './NewTask';

function AllTasks() {
    const [tasks , setTasks] = useState([])

    async function getData()
    {
        // console.log(process.env.REACT_APP_SERVER_URL)
        const url = process.env.REACT_APP_SERVER_URL;
        let data = await fetch(`${url}/tasks`)
        data = await data.json();
        setTasks(data)
    }

    useEffect(()=>{
        getData()
    },[])
  return (
    <div>
        
      ALL TASKS  
      <div style={{display:"flex" , justifyContent:"space-around" , alignItems:"center" , flexWrap:"wrap" }}>
        {
            tasks.map( ( task , idx) => <Task task={task} index={idx} />)
        }
      </div>
    </div>
  )
}

export default AllTasks
