
import {Routes , Route} from 'react-router-dom'
import Headers from './components/Headers'
import Home from './components/Home'
import Login from './components/Login'
import './App.css'

const App = () => (
    <main className="px-2 py-3 md:px-10 md:py-5">
        <Headers/>
        <Routes>
           <Route exact path="/" element={<Home/>}/>
           <Route exact path="/login" element={<Login/>}/>
        </Routes>
    </main>
)

export default App