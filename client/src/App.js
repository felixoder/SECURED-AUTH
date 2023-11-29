
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Register';
import Navbar from './Navbar';
import Layout from './Layout';
import Login from './Login';
import { UserContextProvider } from './UserContex';
import Logout from './Logout';

function App() {
  return (
    <>
    <Navbar/>
    <UserContextProvider>
    <Routes>

      <Route path="/" element={<Layout/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/logout" element={<Logout/>}/>
    </Routes>
    </UserContextProvider>
    </>
  );
}

export default App;
