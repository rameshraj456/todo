const exp = require("express")
const app = exp()
const CORS = require("cors")
const mongoClient = require("mongodb").MongoClient;

app.use(exp.json())
app.use(CORS())

mongoClient.connect('mongodb+srv://ramesh:ramesh@cluster0.8bbamae.mongodb.net/?retryWrites=true&w=majority').then( client => {
    const DB = client.db("todo")

    const tasksCollection = DB.collection("tasks");
    app.set("tasksCollection" , tasksCollection)
})

app.get('/', (req,res) => {
    res.send("hi i am todo server speaking.")
})

app.get('/tasks' , (req,res) => {
    res.send(tasks)
})

// with id
app.get('/task' , (req,res) => {
    let data = tasks.filter( task => task.id == req.query.id )
    res.send(data)
})
// with status : to-do work


// create-task route
app.post('/create-task' , (req,res) => {
    let newTask = req.body;
    console.log(newTask);

    tasks.push(newTask);
    res.send({
        success:true,
        message:"new task created"
    })
})

// update status
app.put('/update-status-to-completed' , (req,res) => {
    console.log( req.body.id );

    tasks.forEach( task => {
        if( task.id == req.body.id )
        {
            task.status = "completed";
        }
    })
    res.send(tasks)
})

app.put('/update-status-to-incomplete' , (req,res) => {
    console.log( req.body.id ); 

    tasks.forEach( task => {
        if( task.id == req.body.id )
        {
            task.status = "inComplete";
        }
    })
    res.send(tasks)
})

// delete task
app.delete("/delete-task" , (req , res) => {
    console.log(`task with id ${req.body.id} , is deleted.`);

    tasks = tasks.filter( task => task.id != req.body.id );
    res.send(tasks);
})

// generate -id 
app.get('/get-id' , ( req,res) => {
    let cur_id = 0;
    for(let i=0;i<tasks.length;++i)
    {
        cur_id = Math.max( cur_id , tasks[i].id );
    }
    res.send( { new_id : cur_id+1 })
})

app.listen(4000 , ()=> {
    console.log("server running on PORT 4000 ...")
})