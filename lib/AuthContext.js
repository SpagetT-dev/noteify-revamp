import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase'; // Adjust path to your Firebase config
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        // Check if user document exists, create if not
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          // Create user document with default fields
          await setDoc(userDocRef, {
            displayName: currentUser.displayName || 'User',
            theme: 'light',
            createdAt: new Date().toISOString(),
          });
        }
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signup = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Update Firebase Auth profile
      await updateProfile(user, { displayName });
      // Create user document
      await setDoc(doc(db, 'users', user.uid), {
        displayName,
        theme: 'light',
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateUserProfile = async (displayName) => {
    try {
      await updateProfile(auth.currentUser, { displayName });
      // Update Firestore document
      await setDoc(doc(db, 'users', auth.currentUser.uid), { displayName }, { merge: true });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}