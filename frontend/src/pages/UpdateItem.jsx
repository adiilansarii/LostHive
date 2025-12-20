import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios.js";

export default function UpdateItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    location: "",
    type: "lost",
  });

  useEffect(() => {
    api.get(`/items/${id}`).then((res) => {
      const { title, location, type } = res.data;
      setForm({ title, location, type });
    });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    await api.put(`/items/${id}`, form);
    navigate(`/items/${id}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-[#301CA0]">
        Edit Item
      </h2>

      <form onSubmit={submit} className="space-y-3">
        <input
          className="border p-2 w-full rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="border p-2 w-full rounded"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <select
          className="border p-2 w-full rounded"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <button className="bg-[#7132CA] text-white w-full py-2 rounded hover:bg-[#301CA0]">
          Update
        </button>
      </form>
    </div>
  );
}
