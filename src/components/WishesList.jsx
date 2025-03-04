import { useEffect, useState } from "react";
import { db } from "../firebase"; // Ensure correct path
import { collection, getDocs } from "firebase/firestore";

const WishesList = () => {
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "wishes"));
        const wishesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWishes(wishesData);
      } catch (error) {
        console.error("Error fetching wishes:", error);
      }
    };

    fetchWishes();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">💌 Wishes List</h1>
      <ul>
        {wishes.map((wish) => (
          <li key={wish.id} className="p-4 mb-2 border border-gray-300 rounded">
            <p><strong>Email:</strong> {wish.email}</p>
            <p><strong>Message:</strong> {wish.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishesList;
