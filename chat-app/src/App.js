
import { Route, Routes } from "react-router-dom";
import Home from './Comonents/Common/Home';
import Login from './Comonents/User/Login';
import Register from './Comonents/User/Register';
import ChatSection from './Comonents/Pages/ChatSection';
import '../src/App.css'

function App() {
  return (
    <div className="App">
      <Routes>
      {/* <Route exact path='/' element={<Home/>}/> */}
      <Route exact path='/' element={<Login/>}/>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/chats' element={<ChatSection/>}/>
     </Routes>
    </div>
  );
}

export default App;
