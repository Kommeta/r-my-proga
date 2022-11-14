import React from 'react';
import './styles/App.scss';
import {BrowserRouter, Routes ,Route} from 'react-router-dom'
import { Home } from './pages/Home';
import Header from './components/Header';
import { Reviews } from './pages/Reviews';
import { About } from './pages/About';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
    <div className="wrapper">
      <Header/>
      <div style={{padding: '20 0', margin: '0 auto', width: '940px'}}>
        <Routes>
          <Route path={'/'} exact element={<Home />} />
          <Route path={'/reviews'} element={<Reviews />} />
          <Route path={'/about'} element={<About />} />
        </Routes>
      </div>
    </div> 
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
