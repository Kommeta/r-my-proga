import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
  <>
    <div className="wrapper">
      <Header />
        <div style={{padding: '40px 0', margin: '0 auto', width: '940px'}}>
          <Outlet />
        </div> 
    </div> 
    <Footer/>
  </>
)}

export default MainLayout