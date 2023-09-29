import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (

    <Routes>
      <Route path="/carteira" element={ <Wallet /> } />
      <Route path="/" element={ <Login /> } />
    </Routes>

  );
}

export default App;
