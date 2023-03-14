import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Home from './pages/home/Home'
import Digital from './pages/digital/Digital';
import Evolve from './pages/evolve/Evolve';
import Purpose from './pages/purpose/Purpose';
import WanderLust from './pages/wanderlust/WanderLust';


export default function App() {
  /*
    TO DO:

    - SECRET EXCLUDE FUNCTION
  */

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route index element={<Home />} />
          <Route path='digital' element={<Digital />} />
          <Route path='evolve' element={<Evolve />} />
          <Route path='purpose' element={<Purpose />} />
          <Route path='wanderlust' element={<WanderLust />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}