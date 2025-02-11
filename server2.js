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

app.get('/tasks' , async (req,res) => {
    const tasksCollection = req.app.get("tasksCollection")
    const tasks = await tasksCollection.find().toArray();
    res.send(tasks)
})

// with id
app.get('/task' , async (req,res) => {
    const tasksCollection = req.app.get("tasksCollection")
    const tasks = await tasksCollection?.find( { id: Number(req.query.id) } ).toArray();

    res.send(tasks)
})
// with status : to-do work


// create-task route
app.post('/create-task' , async (req,res) => {

    const tasksCollection = req.app.get("tasksCollection")

    let newTask = req.body;
    newTask.status = "inComplete";
    console.log(newTask);

    await tasksCollection.insertOne(newTask)
    res.send({
        success:true,
        message:"new task created"
    })
})

// update status
app.put('/update-status-to-completed' , async  (req,res) => {
    const tasksCollection = req.app.get("tasksCollection")
    await tasksCollection.updateOne( { id:req.body.id } , { $set: { status : "completed" }} )
    const tasks = await tasksCollection.find().toArray();

    res.send(tasks)
})

app.put('/update-status-to-incomplete' , async  (req,res) => {
    const tasksCollection = req.app.get("tasksCollection")
    await tasksCollection.updateOne( { id:req.body.id } , { $set: { status : "inComplete" }} )
    const tasks = await tasksCollection.find().toArray();

    res.send(tasks)
})

// delete task
app.delete("/delete-task" , async  (req , res) => {
    console.log(`task with id ${req.body.id} , is deleted.`);
    const tasksCollection = req.app.get("tasksCollection")

    await tasksCollection.deleteOne( { id:req.body.id } );
    const tasks = await tasksCollection.find().toArray();

    res.send(tasks)
})

// generate -id 
app.get('/get-id' , async ( req,res) => {
    const tasksCollection = req.app.get("tasksCollection")
    const tasks = await tasksCollection.find().toArray();

    let cur_id = 0;
    for(let i=0;i<tasks.length;++i)
    {
        cur_id = Math.max( cur_id , tasks[i].id );
    }
    res.send( { new_id : cur_id+1 })
})

app.listen(4000 , ()=> {
    console.log("server2 running on PORT 4000 ...")
})