import { useState, useEffect } from "react";
import {
  deleteDoc,
  doc,
  onSnapshot,
  query,
  collection,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const useDelete = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (collectionName, id) => {
    setLoading(true);
    setError(null);
    try {
      // if the collection is products, delete all purchases with the productID
      if (collectionName === "products") {
        console.log(`deleting ${collectionName}`);
        const q = query(
          collection(db, "purchases"),
          where("ProductID", "==", id)
        );
        onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach(async (document) => {
            console.log("deleting individual purchase");
            await deleteDoc(doc(db, "purchases", document.id));
          });
        });
        //then delete the product
        await deleteDoc(doc(db, collectionName, id));
      } else {
        console.log(`deleting ${collectionName}`);
        await deleteDoc(doc(db, collectionName, id));
      }
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
