import React, { useEffect, useState } from 'react'
import Task from './Task';

function SingleTask() {

  const [task , setTask] = useState({})

  async function getData(id) {
    let data = await fetch(`${process.env.REACT_APP_SERVER_URL}/task/?id=${id}`)
    data = await data.json();
    setTask(data[0]);
    
  }

  useEffect(()=>{
    let params = new URLSearchParams(window.location.search)
    params = params.get("id")
    getData(params)
  },[])

  return (
    <div>
      SINGLE TASK

      {
        task ? <Task  task={task} index={1}/> : <p>NO task found </p>
      }
    </div>
  )
}

export default SingleTask
