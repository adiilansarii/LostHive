import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

export default function CreateItem() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    location: "",
    type: "lost",
  });
  const [photo, setPhoto] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (photo) fd.append("photo", photo);

    await api.post("/items", fd);
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4 text-[#301CA0]">
        Post Lost / Found Item
      </h2>

      <form onSubmit={submit} className="space-y-3">
        <input
          className="border p-2 w-full rounded"
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Location"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <select
          className="border p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />

        <button className="bg-[#7132CA] text-white w-full py-2 rounded hover:bg-[#301CA0]">
          Submit
        </button>
      </form>
    </div>
  );
}
