import { useState } from "react";
import api from "../api/axios";

const CreateListing = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });
    data.append("image", image);

    try {
      await api.post("/listings", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Listing created successfully!");
    } catch (err) {
      alert("Failed to create listing");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 40 }}>
      <h2>Create Listing</h2>

      <input name="title" placeholder="Title" onChange={handleChange} />
      <br />
      <br />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
      />
      <br />
      <br />
      <input
        name="price"
        type="number"
        placeholder="Price"
        onChange={handleChange}
      />
      <br />
      <br />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <br />
      <br />

      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <br />
      <br />

      <button type="submit">Create</button>
    </form>
  );
};

export default CreateListing;
