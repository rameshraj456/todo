import React, { useEffect, useState } from 'react';
import Task from './Task';
import NewTask from './NewTask';
import './AllTasks.css'; 

function AllTasks() {
    const [tasks, setTasks] = useState([]);

    async function getData() {
        const url = process.env.REACT_APP_SERVER_URL;
        let data = await fetch(`${url}/tasks`);
        data = await data.json();
        setTasks(data);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="all-tasks-container">
            <h2 className="all-tasks-title">All Tasks</h2>
            <div className="tasks-wrapper">
                {tasks.map((task, idx) => (
                    <div key={idx} className="task-card">
                        <Task task={task} index={idx} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllTasks;
