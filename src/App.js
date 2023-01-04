import React from 'react';
import './styles/App.scss';
//import './styles/Button.scss';
import {BrowserRouter, Routes ,Route} from 'react-router-dom'
import { Home } from './pages/Home';
import Header from './components/Header';
import { Reviews } from './pages/Reviews';
import { About } from './pages/About';
import Footer from './components/Footer';
import { Profile } from './pages/Profile';
import { Registration } from './pages/Registration';
import { SignIn } from './pages/SignIn';

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
      <div className="wrapper">
        <Header/>
        <div style={{padding: '40px 0', margin: '0 auto', width: '940px'}}>
          <Routes>
            <Route path={'/'} exact element={<Home />} />
            <Route path={'/reviews'} element={<Reviews />} />
            <Route path={'/about'} element={<About />} />
            <Route path={'/profile'} element={<Profile />} />
            <Route path={'/registration'} element={<Registration />} />
            <Route path={'/sign-in'} element={<SignIn />} />
          </Routes>
        </div>
      </div> 
      <Footer/>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
