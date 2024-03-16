import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const useUpdate = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = async (collectionName, id, obj) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`updating ${collectionName}`);
      await updateDoc(doc(db, collectionName, id), obj);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, updateData };
};

export default useUpdate;
