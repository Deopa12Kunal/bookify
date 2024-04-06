import { createContext,useContext,useState,useEffect} from "react";
import { initializeApp } from "firebase/app";
import {getAuth,
     createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
     GoogleAuthProvider,
     signInWithPopup,
     onAuthStateChanged,
      } from "firebase/auth";
const FirebaseContext = createContext(null);
 const firebaseConfig = {
    apiKey: "AIzaSyCQbsbLlUzpiuoMSWWU7AmQqFt3VOOX11Y",
    authDomain: "bookify-app-using--firebase.firebaseapp.com",
    projectId: "bookify-app-using--firebase",
    storageBucket: "bookify-app-using--firebase.appspot.com",
    messagingSenderId: "314990275356",
    appId: "1:314990275356:web:c126ba78bf4029382d28d9"
  };
  export const useFirebase =()=>useContext(FirebaseContext);
  const firebaseApp = initializeApp(firebaseConfig);
   const firebaseAuth = getAuth(firebaseApp);
   const googleProvider = new GoogleAuthProvider();
export const FirebaseProvider =(props)=>{
     const[user, setUser]= useState(null);
     useEffect(()=>{
        onAuthStateChanged(firebaseAuth,(user)=>{
            if(user) setUser(user);
            else setUser(null);
        })
     },[]);
     const signupUserWithEmailAndPassword =(email, password)=>
     createUserWithEmailAndPassword(firebaseAuth, email, password)
     .then((userCredential)=>{
        const user = userCredential.user;
        console.log(user);
      })
     .catch((error)=>{
        console.log(error.message);
      });

       const signinUserWithEmailAndPass = (email, password)=>
       signInWithEmailAndPassword(firebaseAuth,email,password)
       .then((userCredential)=>{
        const user = userCredential.user;
        console.log("User Loggen in ",user);
      })
     .catch((error)=>{
        console.log("User Not found ",error.message);
      });
 const siginWithGoogle =()=>signInWithPopup(firebaseAuth,googleProvider)

const isLoggedIn = user ? true: false
;    return(
        <FirebaseContext.Provider value ={{
            signupUserWithEmailAndPassword,
            signinUserWithEmailAndPass,
            siginWithGoogle,
            isLoggedIn
        
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
};
