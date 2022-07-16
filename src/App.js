// import logo from './images/insta_word_logo.png'
import './App.css';
import Post from './components/Post';
import React, { useState, useEffect } from 'react';
import {auth, db } from './firebase.js';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import ImageUpload from './components/ImageUpload';

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

  function App() {
    const [posts, setPosts] = useState([]);     
    const [openSignIn, setOpenSignIn] = useState(false)
    const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    
    const signUp = (event) => {
      event.preventDefault();
      auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          return authUser.user.updateProfile({
            displayName: userName
          })
        })
        .catch((error) => alert(error.message));
      console.log(userName);
      // if(authUser)console.log(displayName);
      setOpen(false);
    }

      const signIn = (event) => {
        event.preventDefault();
        auth
          .signInWithEmailAndPassword(email, password)
          .catch((error) => alert(error.message));
        setOpenSignIn(false);
      } 

    useEffect(() => {
      db.collection('posts').onSnapshot(snapshot => {
      //snapshot takes image of all documents formed in the database and fires all when a new document is created
      // every time a new post is added this code fires
      //docs are all the docs created using snapshot and map is like a loop to go through all docs created in the db
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
      // data is caption,username, imageUrl
      })  
    
    }, [])
    
    useEffect(() => {
      //this is gonna listen for anytime any authentication change happens
      const unsubscribe = auth.onAuthStateChanged((authUser)   => {
        if (authUser) {
          console.log(authUser);
        //user has logged in
          //following code survives refresh which state couldn't
          // on refresh onAuthStateChanged just checks if there was an user
          setUser(authUser);
          if (authUser.displayName) {
            //don't update username
            console.log("already");
            console.log(authUser.displayName);
            console.log(user.displayName);
          }
          else {
            console.log(authUser);
            console.log("doing now");
            return authUser.updateProfile({
              displayName:userName,
            })
          }

        }
        else {
        //user has logged out
          setUser(null);
        }
      })   
      return () => {
        //perform some cleanup actions
        //for change in a username, run useeffect but delete previous username so that there's no duplicates
        unsubscribe();
      }
    }, [user,userName]);
  
    // if (1 > 0) {
    //   console.log(user.userName)
    // }

    return (
    <div className="app">
        {/* <h1>Hello</h1> */}
        
        {/* I want to have --- for post uploading */}
        {/* Caption Input */}
        {/* File Picker */}
        {/* Post button */}
              

      {/* <Button onClick={handleOpen}>Open modal</Button> */}
       <Modal
        open={open}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
       >
       
        <Box sx={style}>
          <form className="app__signup">
              <center>
                <img src="./images/insta-2.jpg" alt="Instagram" className="app__headerImage" />             
              </center>

          <Input
            type="text"
            placeholder='username'
            value={ userName}
            onChange={(e)=>setUserName(e.target.value)}
          />

          <Input
            type="email"
            placeholder='email'
            value={ email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder='password'
            value={password }
            onChange={(e)=>setPassword(e.target.value)}
          />

          <Button type="submit" onClick={signUp}>Sign Up</Button>

          </form>
          
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal            
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
          <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
       >
       
        <Box sx={style}>
          <form className="app__signup">
              <center>
                <img src="./images/insta-2.jpg" alt="Instagram" className="app__headerImage" />             
              </center>

         

          <Input
            type="email"
            placeholder='email'
            value={ email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder='password'
            value={password }
            onChange={(e)=>setPassword(e.target.value)}
          />

          <Button type="submit" onClick={signIn}>Sign In</Button>

          </form>
          
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal            
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
      <div className="app__header">
          <img src="./images/insta-2.jpg" alt="Instagram" className="app__headerImage" />
          {user ? (
          <Button onClick={()=>auth.signOut()}>Logout</Button>
        ) : (
            <div className="app__loginContainer">
              <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
              <Button onClick={() => setOpen(true)}>Sign Up</Button>
            </div>
          
        )}
        </div>
        <div className="app__posts">
          <div className="app__postsLeft">
                    {/* Header */}
              {//looping through posts array
                posts.map(({id,post}) => (
                <Post key={id} user={user} postId={id} userName={post.userName} caption={ post.caption} imageUrl={post.imageUrl} />
                ))
                //key and id made react to re render only new posts which are added from database and not older ones as it had been doing without using key
                  // basically it just refreshes one post 
              }    
          </div>
          <div className="app__postsRight">

          </div>
       </div>
      {/* posts */}
        {/* <ImageUpload userName={userName} /> */}
        {/* console.log('Suvigya'); */}
        {
          user ? (
            <ImageUpload userName={user.displayName} />
          // <h1>Hello</h1>
          ): (
              <h3>Sorry you need to login to upload!!!</h3>
          )
        }
        
    </div>
  );
}

export default App;
