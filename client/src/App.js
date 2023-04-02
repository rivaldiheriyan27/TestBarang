import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import { ProtectedRoute } from './components/ProtectedRoute';
import ItemHome from './pages/itemHome';
import CreateItem from './pages/createItem/CreateItem';
import EditProduct from './pages/editItem/EditProduct';
import DetailItem from './pages/detailItem/DetailItem';


function App() {
  return (
   <Routes>
      <Route path='/' element={< Login />}></Route>
      <Route path='/register' element={< Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/item' element={< ItemHome />} /> 
        <Route path='/item/:id' element={< DetailItem />} />
        <Route path='/createItem' element={< CreateItem />} />
        <Route path='/editItem/:id' element={< EditProduct />} />
      </Route>
   </Routes>
  );
}

export default App;
