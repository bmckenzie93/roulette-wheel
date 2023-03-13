import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Home from './pages/home/Home'
import WanderLust from './pages/wanderlust/WanderLust';
import Digital from './pages/digital/Digital';


export default function App() {
  /*
    TO DO:
    
    - SECRET EXCLUDE FUNCTION
    - AUTH
  */

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route index element={<Home />} />
          <Route path='wanderlust' element={<WanderLust  />} />
          <Route path='digital' element={<Digital  />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}