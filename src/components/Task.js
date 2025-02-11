import React from 'react'

function Task( { task , index} ) {

    const URL = process.env.REACT_APP_SERVER_URL;

    async function deleteTask()
    {
        let data = await fetch(`${URL}/delete-task` , {
            method:"DELETE",
            headers:{ "Content-Type":"application/json"},
            body:JSON.stringify( { id:task.id } )
        })
        data = await data.json();
        console.log(data);
        
        window.location.reload();
    }

    async function setAsInComplete(){
        let data = await fetch(`${URL}/update-status-to-incomplete` , {
            method:"PUT",
            headers:{ "Content-Type":"application/json"},
            body:JSON.stringify( { id:task.id } )
        })
        data = await data.json()
        console.log(data);
        window.location.reload();
    }

    async function setAsComplete(){
        let data = await fetch(`${URL}/update-status-to-completed` , {
            method:"PUT",
            headers:{ "Content-Type":"application/json"},
            body:JSON.stringify( { id:task.id } )
        })
        data = await data.json()
        console.log(data);

        window.location.reload();
        
    }

  return (
    <div  style={{backgroundColor:"wheat" , padding:"15px" , margin:"10px" , textAlign:"left" , borderRadius:"10px"}}>
      <p> id : {task.id}</p>
      <p> date : {task.date}</p>
      <p> title : {task.title}</p>
      <p> task : {task.task}</p>
      
       {
        task.status == "completed" ?
        <p style={{ backgroundColor:"green"}}>completed</p>
        :
        <p style={{  backgroundColor:"red" }}> in-complete </p>
       }

       <div>
        <button 
        onClick={()=>deleteTask()}
        >DELETE</button>
         

         {
            task.status == "completed" ?
            <button 
            onClick={() => setAsInComplete()}
            style={{ backgroundColor:"red"}}>in - completed</button>
            :
            <button 
            onClick={ ()=> setAsComplete()}
            style={{  backgroundColor:"green" }}> completed </button>
        }

       </div>
    </div>
  )
}

export default Task
