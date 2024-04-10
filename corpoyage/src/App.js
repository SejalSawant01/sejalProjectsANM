
import { RouterProvider } from 'react-router-dom';
import Routing from './routing/Routing';
import './App.css';

function App() {
  return (
    <>
    <RouterProvider router={Routing} />
    </>
  );
}

export default App;
