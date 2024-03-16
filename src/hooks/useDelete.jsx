import { useState, useEffect } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const useDelete = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (collectionName, id) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`deleting ${collectionName}`);
      await deleteDoc(doc(db, collectionName, id));
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, deleteData };
};

export default useDelete;
