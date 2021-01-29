import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectuser,logout } from './features/userSlice';
import Login from './Login';
import { auth } from './firebase';
import { selectChannelId, selectChannelName } from './features/appSlice';


function App() {
  const dispatch = useDispatch()
  const user=useSelector(selectuser);
 
  
  useEffect(() => {
    auth.onAuthStateChanged(authUser=>{
      console.log(authUser)
if(authUser){
dispatch(
  login({
uid:authUser.uid,
photo:authUser.photoURL,
email:authUser.email,
displayName:authUser.displayName,

}))
}else{
dispatch(logout())
}
    })
    
  }, [dispatch]);
  return (
    <div className="App">
    {user ? 
    (
    <>  
    <Sidebar />
    <Chat />
    
    </>
    ):( <Login/>
      )}
    </div>
  );
}

export default App;
