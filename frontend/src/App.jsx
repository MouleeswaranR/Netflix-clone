
import { Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';


function App() {
 return (
 <Routes>
    <Route path='/' element={<HomePage/>}></Route>
    <Route path='/login' element={<LoginPage/>}></Route>
    <Route path="/signup" element={<SignUpPage/>}></Route>
 </Routes>
)
}

export default App
