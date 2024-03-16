import { useState, useEffect } from "react";
import { onSnapshot, query, doc } from "firebase/firestore";
import { db } from "../firebase";

const useFetchById = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDataById = async (id, collectionName) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`fetching ${collectionName} by Id`);
      const q = query(doc(db, collectionName, id));
      onSnapshot(q, (doc) => {
        try {
          if (doc.data() === undefined) {
            throw new Error("No data found");
          }
          setData({ id: doc.id, ...doc.data() });
        } catch (error) {
          setError(error);
        }
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getDataById };
};

export default useFetchById;
