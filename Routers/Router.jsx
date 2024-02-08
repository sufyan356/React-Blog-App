
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Layout from "../Layout";
import {
  onAuthStateChanged,
  auth,
  getDocs,
  addDoc,
  collection,
  updateDoc,
  doc,
  db,
} from "../Components/Firebase/Firebase";
import Loader from "../Components/Loader/Loader";
import ServiceUnavailable from "../Components/ServiveUnavailable";
import BlogDescription from "../Pages/BlogDescription";

// const LatestUser = async (latestUid, latestUserName) => {
//   const name = latestUserName.slice(0, latestUserName.indexOf("@"));
// try {
//     const isUser = localStorage.getItem("latestUser") || null;
//     // const isUser = await getDocs(collection(db, "isUser"));

//     const querySnapshot = await getDocs(collection(db, "LatestUser"));
//     const isUserExist = querySnapshot.docs.find((doc) => isUser === doc.data().id);
//     console.log( isUserExist ,"isUserExist")
//     if (isUserExist) {
//       const updatedDoc = doc(db, "LatestUser", isUser);
//       await updateDoc(updatedDoc, { latestUid , latestUserName});
//     } else {
//       const docRef = await addDoc(collection(db, "LatestUser"), { latestUid , latestUserName});
//       await updateDoc(docRef, { id: docRef.id });
//       localStorage.setItem("isUser", docRef.id);
//       // const docRefIsUser = await addDoc(collection(db, "isUser"), {latestUser : docRef.id});

//     }
//   } catch (error) {
//     console.error("LatestUser Error:", error);
//   }
  

  
// };

// try {
//   const isUser = await getDocs(collection(db, "isUser"));

//   const latestUserQuerySnapshot = await getDocs(collection(db, "LatestUser"));
  
//   if (latestUserQuerySnapshot.docs.length > 0) {
//     const latestUserDoc = latestUserQuerySnapshot.docs[0].ref;
//     await updateDoc(latestUserDoc, { latestUid, latestUserName: name });
//   } else {
//     const docRef = await addDoc(collection(db, "LatestUser"), { latestUid, latestUserName: name });

//     const docRefIsUser = await addDoc(collection(db, "isUser"), { latestUserId: docRef.id });
//   }
// } catch (error) {
//   console.error("LatestUser Error:", error);
// }



 

const AppRouter = () => {
  const [isUser, setIsUser] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  // const [userName, setUserName] = useState("");
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    console.log("UseEffect")

    // Subscribe to authentication changes
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged")

      if (user) {
        console.log("user", user);
        setIsUser(true);
        setUserEmail((user.email));
        // const userName = userEmail.slice(0, userEmail.indexOf("@"))
        const latestUserData = JSON.parse(localStorage.getItem("latestUser"))
        console.log("latestUserData" , latestUserData)
        // LatestUser(user.uid , user.email);
        // LatestUser(latestUserData.id , latestUserData.name);
      } else {
        setIsUser(false);
        console.log(user);
      }
      setIsLoader(false);
    });

    // Cleanup the onAuthStateChanged listener when the component unmounts
    return () => {
      console.log("Mar Gaya")
      unsubscribeAuth();
    };
  }, []);

  return isLoader ? (
    <div className="MainLoader">
      <Loader />
    </div>
  ) : (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/">
            <Route path="">
              <Route
                path=""
                element={isUser ? <Navigate to="/dashboard" /> : <Login />}
              />
              <Route
                path="signup"
                element={isUser ? <Navigate to="/dashboard" /> : <Signup />}
              />
            </Route>

            <Route
              path="Dashboard"
              element={
                isUser ? <Layout name={userEmail} /> : <Navigate to="/" />
              }
            >
              <Route
                path=""
                element={isUser ? <Home /> : <Navigate to="/" />}
              />
              <Route
                path="blog-description/:id"
                element={isUser ? <BlogDescription /> : <Navigate to="/" />}
              />
            </Route>

            <Route path="*" element={<ServiceUnavailable />} />
          </Route>
        )
      )}
    />
  );
};

export default AppRouter;
