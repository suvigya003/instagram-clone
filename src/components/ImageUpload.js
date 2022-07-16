import React, {useState} from 'react'
import Button from '@mui/material/Button';
import { storage, db } from '../firebase';
// import { serverTimestamp, orderBy } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import './ImageUpload.css'

function ImageUpload({userName}) {
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState('');
  
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
  
    const handleUpload = () => {

        //upload image in firebase storage then get download link from ther to upload it in database


        // images folder in storage
        // .ref is referencing to image in images folder 
        // .put is putting that image in uploadTask
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        //uploadTask is uploading image in firebase storage
        uploadTask.on(
            // 1) for upload bar
            //on state change keep giving me snapshot of how much upload has been done
            "state_changed",
            (snapshot) => {
                //progress function....
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
        setProgress(progress);
            },
            // 2) for uploading
            (error) => {
                //error functio...
                alert(error.message);
            },
            () => {
                //complete function....
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // post image inside db
                        db.collection("posts")
                            //older version-> .orderBy('timestamp','desc')
                            .add({
                            // older version-> timestamp: firebase.firestore.FieldValue.serverTimestamp();
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            userName: userName
                            });
                        db.collection("posts")
                            .orderBy('timestamp','desc')
                           
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })
                .catch((error) => alert(error.message));
            }
        )
    }
            
        
    

    return (
        <div className="imageupload">
          <progress className='imageupload__progress' value={progress} max="100"/>
          <input type="text" placeholder='Enter a caption...' onChange={(event)=>setCaption(event.target.value)} value={caption} />
          <input type="file" onChange={handleChange} />
          <Button onClick={handleUpload}>
              Upload
          </Button>
    </div>
  )
}

export default ImageUpload