import { createContext, useEffect, useState } from "react";
import app from "../../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import useAxiosPublice from "../../Hooks/useAxiosPublice";

export const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublice = useAxiosPublice();

  // signUP function
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // SignIn function
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // signOut function
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // singIn with goole
  const googleSign = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // Update profile
  const updateUserProfile = (name, url) => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: url,
    });
  };

  // observer function
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        // get token form server
        await axiosPublice.post("/jwt", userInfo).then((res) => {
          // set token in local stroge
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          }
        });
      } else {
        // remove token from localStroge
        localStorage.removeItem("access-token");
      }
      // setLoading(false);
    });
    return () => unSubscribe();
  }, [axiosPublice]);

  const userInfo = {
    user,
    loading,
    createUser,
    logIn,
    updateUserProfile,
    logOut,
    googleSign,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
