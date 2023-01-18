import React from 'react';
import './styles/App.scss';
//import './styles/Button.scss';
import {BrowserRouter, Routes ,Route} from 'react-router-dom'
import MainLayout from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Reviews } from './pages/Reviews';
import { About } from './pages/About';
import { Profile } from './pages/Profile';
import { SignIn } from './pages/SignIn';

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path={'reviews'} element={<Reviews />} />
            <Route path={'about'} element={<About />} />
            <Route path={'profile'} element={<Profile />} />
            <Route path={'sign-in'} element={<SignIn />} />
            <Route path={'*'} element={<h1>Not Foond</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
