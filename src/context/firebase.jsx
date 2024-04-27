import { createContext,useContext,useState,useEffect} from "react";
import { initializeApp } from "firebase/app";
import {getAuth,
     createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
     GoogleAuthProvider,
     signInWithPopup,
     onAuthStateChanged,
      } from "firebase/auth";
     //importing firestore and creating instance of firestore 
     // Todo: to upload image in firestore we need two things [collection, addDoc]
     import {addDoc, collection, getFirestore, getDocs,getDoc,doc} from "firebase/firestore";
      // add ref 
      import{getStorage, ref, uploadBytes,getDownloadURL} from "firebase/storage";
// import { upload } from "@testing-library/user-event/dist/upload";
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
   //created instance of the firestore
   const firestore =  getFirestore(firebaseApp);
    const  storage = getStorage(firebaseApp);
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

      // TO see the users
      console.log(user);
      const handleCreateNewListing = async(name, isbn,price,cover)=>{
      //todo: in this we have to pass wehere we have to pass/ store the image
        
    const imageRef = ref(storage,`uploads/images/${Date.now()}-${cover.name}`);
     const uploadResult =await uploadBytes(imageRef,cover);
      return await addDoc(collection(firestore,'books'),{
      name,
      isbn,
      price,
      imageURL :uploadResult.ref.fullPath,
      userID : user.uid,
      displayName :user.displayName,
      photoURL: user.photoURL,
      userEmail : user.email,
     });
      };
       // The correct usage of getDocs involves passing the firestore 
      //instance and the collection reference as separate arguments. Here's how you can fix it:
      const listAllBooks = async () => {
        const booksCollection = collection(firestore, 'books');
        const querySnapshot = await getDocs(booksCollection);
        return querySnapshot.docs.map(doc => doc.data());
    };
      
      // TODO: creating a function , from where we can fetch the details using that : userID
      // function works: whenever we will pass a id of a book this function
      // will return me the book
      const getBookById =  async(userID)=>{
        const docRef = doc(firestore,"books", userID) ;
        const result = await getDoc(docRef)
        return result;
      };
      //TODO: Creating a method to get image url
      // const getImageURL = (path)=>{
      //   return getDownloadURL(ref(storage,path));
      // };//TODO: Creating a method to get image url
const getImageURL = async (path) => {
  const storageRef = ref(storage, path);
  try {
      const url = await getDownloadURL(storageRef);
      return url;
  } catch (error) {
      console.error("Error getting download URL:", error);
      return null;
  }
};
      //TODO: retreiving the data from the data base using getdocs
     
      
const isLoggedIn = user ? true: false;  
  return(
        <FirebaseContext.Provider value ={{
            signupUserWithEmailAndPassword,
            signinUserWithEmailAndPass,
            siginWithGoogle,
            handleCreateNewListing,
            isLoggedIn,
            getImageURL,
            getBookById,
            listAllBooks,
        
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
};
