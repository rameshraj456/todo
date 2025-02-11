import React, { useState } from 'react'

function NewTask() {
  const [form , setForm] = useState({})


  async function addTask(e)
  {
    e.preventDefault()

    const url = process.env.REACT_APP_SERVER_URL;
    let new_id = await fetch(`${url}/get-id`);
    new_id = await new_id.json()
    setForm( prevData => ( { ...prevData , id:new_id.new_id } ))
    form.id = new_id.new_id ;
    
    console.log(form);

    let data = await fetch(`${url}/create-task` , {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify( form )
    })
    data = await data.json();
    console.log(data);
  }

  return (
    <div>
      NEW TASK
      <form>

        <input 
          type='text'
          placeholder='title'
          onChange={(e) => setForm( prevData => ( {...prevData , title:e.target.value }) )}
        />
        <br/>

        <textarea 
          placeholder='some task goes here'
          style={{width:"200px" , height:"100px" }}
          onChange={(e) => setForm( prevData => ( {...prevData , task : e.target.value }) )}
        />
        <br/>

        <input 
          type='date'
          onChange={(e) => setForm( prevData => ( {...prevData , date : e.target.value }) )}
        />
        <br/>

        <button
        onClick={( e) => addTask(e)}
        >ADD TASK</button>

      </form>
    </div>
  )
}

export default NewTask
