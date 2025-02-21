import React, { useEffect, useState } from 'react'
import Task from './Task';

function SingleTask() {

  const [id,setId] = useState()

  const [task , setTask] = useState({})

  // async function getData() {
  //   console.log(id)
  //   let data = await fetch(`${process.env.REACT_APP_SERVER_URL}/task/?id=${id}`)
  //   data = await data.json();
  //   setTask(data[0]);
    
  // }

  // useEffect(()=>{
  //   // let params = new URLSearchParams(window.location.search)
  //   // params = params.get("id")
  //   getData()
  // },[])


  async function getId(e){
    e.preventDefault()
    console.log(id)

    let data = await fetch(`${process.env.REACT_APP_SERVER_URL}/task/?id=${id}`)
    data = await data.json();
    setTask(data[0]);
  }

  return (
    <div>
      SINGLE TASK
      <br />
      <input type='number' placeholder='enter ID' onChange={(e) => setId(e.target.value)}
      style={{
        padding:'8px',margin:'8px'
      }} />
      <br />
      <button onClick={(e) => getId(e) } className='btn'
        style={{
          background:""
        }}>Enter</button>

      {
        task ? <Task  task={task} index={1}/> : <p>NO task found </p>
      }
    </div>
  )
}

export default SingleTask
