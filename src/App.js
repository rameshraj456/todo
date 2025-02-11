
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
