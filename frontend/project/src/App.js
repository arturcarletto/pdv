import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";

import Home from './components/pages/Home/Home';
import Venda from './components/pages/Venda/Venda';
import Produtos from './components/pages/Produtos/Produtos';
import Tipos from './components/pages/Tipo_produtos/Tipo_produtos';
import Relatorio from './components/pages/Relatorio/Relatorio';

import Container from "./components/layout/Container";
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
      <div>
        <BrowserRouter>
          <Navbar/>
          <Container customClass="min-height">
            <Routes>
                <Route path="/" exact  element={<Home/>}/>
              <Route path="/Venda" element={<Venda/>}/>
              <Route path="/Produtos" element={<Produtos/>}/>
              <Route path="/Tipos" element={<Tipos/>}/>
              <Route path="/Relatorio" element={<Relatorio/>}/>
            </Routes>
          </Container>
          <Footer/>
        </BrowserRouter>
      </div>
  );
}

export default App;
