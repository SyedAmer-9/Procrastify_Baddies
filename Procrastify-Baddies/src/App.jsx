import {Routes,Route} from 'react-router-dom';
import { useContext } from 'react';
import {ThemeContext} from './context/ThemeContext.jsx';
import Register from './pages/Register.jsx';

import ProtectedRoute from './components/ProtectedRoute.jsx';
import  Login  from './pages/Login.jsx'
import TodoPage from './pages/TodoPage.jsx';
function App() {
  const {theme} = useContext(ThemeContext);




return(
  <div className={theme}>
    <div className='min-h-screen bg-white darkbg-gray-900'>
      <Routes>
        <Route path = '/register' element={<Register/>}/>
        <Route path ='/login' element={<Login/>}/>

        <Route 
        path='/' 
        element=
      {
        <ProtectedRoute>
          <TodoPage/>
        </ProtectedRoute>
      }
      />
      </Routes>
    </div>
  </div>
)
}

export default App;
