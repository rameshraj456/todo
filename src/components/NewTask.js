import React, { useState } from 'react';
import './NewTask.css'; // Import CSS file

function NewTask() {
  const [form, setForm] = useState({
    title: '',
    task: '',
    date: '',
  });

  async function addTask(e) {
    e.preventDefault();

    const url = process.env.REACT_APP_SERVER_URL;

    try {
      const response = await fetch(`${url}/get-id`);
      const newIdData = await response.json();
      const updatedForm = { ...form, id: newIdData.new_id };

      console.log('Submitting Task:', updatedForm);

      const taskResponse = await fetch(`${url}/create-task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedForm),
      });

      const result = await taskResponse.json();
      console.log('Server Response:', result);

      setForm({ title: '', task: '', date: '' });

    } catch (error) {
      console.error('Error adding task:', error);
    }
  }

  return (
    <div className="new-task-container">
      <h2 className="new-task-title">New Task</h2>
      <form className="new-task-form" onSubmit={addTask}>
        <input 
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
        />

        <textarea 
          placeholder="Some task goes here"
          value={form.task}
          onChange={(e) => setForm(prev => ({ ...prev, task: e.target.value }))}
        />

        <input 
          type="date"
          value={form.date}
          onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value }))}
        />

        <button className="new-task-button" type="submit">ADD TASK</button>
      </form>
    </div>
  );
}

export default NewTask;
