import React, { useState } from 'react';
import './App.css';
import Todo from './components/Todo';
import Header from  './components/Header';
import Auth from './components/Wrapper';
import AuthContext from './auth-context';

const App = props => {
   const [authState, setAuthState] = useState(false);

  // const onLoadToDos = () => {
  //   setAuthState(false);
  // }

  // const onLoadAuth = () => {
  //   setAuthState(true);
  // }

  const [page, setPageName] = useState('auth');

  const switchPageName = (pageName) => {
    setPageName(pageName);
  }

  const login = () => {
    setAuthState(true);
  }

  return(
    <div className="App">
      {/* <Header onLoadToDos={onLoadToDos} onLoadAuth={onLoadAuth} /> */}
      <AuthContext.Provider value={{status: authState, login: login}}>
      <Header 
        onLoadToDos={switchPageName.bind(this, 'todo')} 
        onLoadAuth={switchPageName.bind(this, 'auth')} />
      <hr />
      {
        page === 'auth'? <Auth /> : <Todo />
      }
      </AuthContext.Provider>
    </div>
  );
}
export default App;
