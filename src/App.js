import './App.css';
import React from 'react';
import {
  
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

import Login from './screens/Login';
import Main from './screens/Main';
import SignUp from './screens/SignUp';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';
function App() {
  return (
    <CartProvider>
    <BrowserRouter>
        <div >
            
        
        </div>
        <div>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signuser' element={<SignUp/>}/>
          <Route exact path="/myorder" element={<MyOrder />} />
        </Routes>
        
        </div>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
