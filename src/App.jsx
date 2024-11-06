
import './App.css'
import Home from './components/Home'
import {Routes, Route} from 'react-router-dom'
import SingleFlightDetails from './components/SingleFlightDetails'

function App() {


  return (
    <>
    <Routes>
     
      <Route path="/" element= {<Home />} />
      <Route path="/:id" element= {<SingleFlightDetails/>} />


     </Routes> 
    </>
  )
}

export default App
