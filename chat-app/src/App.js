
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './Comonents/Common/Home';
import Login from './Comonents/User/Login';
import Register from './Comonents/User/Register';
function App() {
  return (
    <div className="App">
          <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/register' element={<Register/>}/>
     </Routes>
    </div>
  );
}

export default App;
