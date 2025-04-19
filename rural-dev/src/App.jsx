
import './App.css'
import Header from './assets/components/header/header.jsx'
import Footer from './assets/components/footer/footer.jsx'
import { Outlet } from 'react-router'

function App() {
  

  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
