import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Book from './pages/Book';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import FormBook from './components/FormBook';
import BookDetail from './components/BookDetail';
import PrivateRoute from './components/PrivateRoute';
import { useState, useEffect } from 'react';

function App() {
  const [ isLogin, setIsLogin ] = useState(false);

  useEffect(() => {
    console.log("APP");
    const token = localStorage.getItem("token");
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }
    console.log("isLoginApp " + isLogin);
  }, [isLogin]);

  return (
    <div className="App">
      <NavigationBar/>
      <Routes>
        <Route path='/' element= { <Home /> }></Route>
        <Route path='/register' element= { <Register /> } ></Route>
        <Route path='/sign-in' element= { <Login /> } ></Route>
        
        <Route path='/profile' element= {
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        }></Route>
        
        <Route path='/cart' element= {
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        }></Route>

        <Route path='/books' element= {
          <PrivateRoute>
            <Book></Book>
          </PrivateRoute>}>
            
        </Route>
        <Route path='/book/add' element= {
          <PrivateRoute>
            <FormBook></FormBook>
          </PrivateRoute>
        }></Route>

        <Route path='/book/:id' element= {
          <PrivateRoute>
            <BookDetail></BookDetail>
          </PrivateRoute>
        }></Route>
        
        
      </Routes>
    </div>
  );
}

export default App;
