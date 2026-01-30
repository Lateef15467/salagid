import { useEffect, useState } from "react";
import api from "../api/axios";

const Listings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get("/listings");
        setListings(res.data.listings);
      } catch (error) {
        console.error("Failed to fetch listings");
      }
    };

    fetchListings();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>All Listings</h2>

      {listings.length === 0 && <p>No listings found</p>}

      {listings.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ccc",
            marginBottom: 15,
            padding: 15,
          }}
        >
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>Price: Rs {item.price}</p>
          <p>Category: {item.category}</p>
        </div>
      ))}
    </div>
  );
};

export default Listings;
