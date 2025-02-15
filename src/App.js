
import { createBrowserRouter, RouterProvider ,Link, useNavigate} from 'react-router-dom';
import './App.css';
import AllTasks from './components/AllTasks';
import NewTask from './components/NewTask';
import SingleTask from './components/SingleTask';

function App() {
  const router = createBrowserRouter([
    {
      path:'',
      element:<AllTasks/>
    },
    {
      path:'create-task',
      element:<NewTask/>
    },
    {
      path:'task',
      element:<SingleTask/>
    },
  ])
  const navigate = useNavigate();
  
  return (
    
    <div className="App">
      <RouterProvider router={router}/>

        <nav className="bg-blue-600 p-4 text-white flex justify-between">
        <div className="text-lg font-bold">Task Manager</div>
          <div>
          <button
          onClick={()=>navigate('./task')}
          >Single</button>
          <button
          onClick={()=>navigate('./create-task')}
          >mutilple</button>
          </div>
        </nav>
    </div>
  );
}

export default App;
