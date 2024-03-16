import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const useAdd = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToDatabase = async (collectionName, obj) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`adding to ${collectionName}`);
      const res = await addDoc(collection(db, collectionName), obj);
      setData(obj);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, addToDatabase };
};

export default useAdd;
