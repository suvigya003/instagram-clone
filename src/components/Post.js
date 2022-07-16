import React ,{useState,useEffect} from 'react'
import './Post.css'
// import Avatar from "@material-ui/core/Avatar";
import Avatar from '@mui/material/Avatar';
import { db } from '../firebase';
import firebase from 'firebase/compat/app';
function Post({user,postId,userName,imageUrl,caption}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db.collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
      db.collection("comments")
      .orderBy('timestamp','desc')
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);
  
  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      userName: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment('');
  }

  return (
      <div className='post'>
          {/* header -> avatar + username*/}
          <div className="post__header">
               <Avatar
              className="post__avatar"
              alt='Suvigya'
              src=""
              />
              {/* <Avatar>H</Avatar> */}
              <h3>{ userName}</h3>
          </div>
         
          {/* image */}
            <img className='post__image' src={imageUrl} alt="Goddess Durga" />
          {/* username + caption */}
          <h4 className='post__text'>
              <strong>{userName}</strong>   { caption}
      </h4>
      
      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.userName}</strong>  {comment.text}
          </p>
        ))}
        </div>

      {user && (
        <form className="post__commentBox">
        <input
          type="text"
          className='post__input'
          placeholder='Add a comment...'
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
        />
        <button
          className='post__button'
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          Post
        </button>
        </form>
       )}

        
    </div>
  )
}

export default Post