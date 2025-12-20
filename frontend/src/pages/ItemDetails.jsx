import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [item, setItem] = useState(null);

  useEffect(() => {
    api.get(`/items/${id}`).then((res) => setItem(res.data));
  }, [id]);

  if (!item) return <Loader />;

  const isOwner = user && user.id === item.owner?._id;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {item.photo && (
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}${item.photo}`}
          className="w-full h-80 object-cover rounded"
        />
      )}

      <h1 className="text-3xl font-bold mt-4 text-[#301CA0]">
        {item.title}
      </h1>

      {item.location && <p className="mt-2">📍 {item.location}</p>}

      {isOwner && (
        <div className="mt-6 flex gap-4">
          <Link
            to={`/items/${id}/edit`}
            className="bg-[#C47BE4] text-white px-4 py-1 rounded"
          >
            Edit
          </Link>

          <button
            onClick={async () => {
              await api.delete(`/items/${id}`);
              navigate("/");
            }}
            className="bg-red-600 text-white px-4 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
