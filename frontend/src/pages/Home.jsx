import ItemCard from "../components/ItemCard";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-[#F29AAE]/30 to-white">
      {/* HERO */}
      <section className="text-center py-20 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#301CA0]">
          FIND LOST ITEMS OR POST FOUND ITEMS EASILY
        </h1>
        <p className="mt-4 text-lg text-[#301CA0]/80">
          Helping Students Reclaim Their Belongings
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/create"
            className="bg-[#7132CA] text-white px-8 py-3 rounded-lg shadow hover:bg-[#301CA0]"
          >
            Report a Lost Item
          </Link>
          <Link
            to="/create"
            className="bg-[#C47BE4] text-white px-8 py-3 rounded-lg shadow hover:bg-[#7132CA]"
          >
            Post a Found Item
          </Link>
        </div>

        <p className="mt-6 text-sm text-[#301CA0]/70">
          Find your lost items or help others by posting recovered items anonymously.
        </p>
      </section>

      {/* RECENT LISTINGS */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-semibold text-center text-[#7132CA] mb-8">
          Recent Listings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Example cards (replace with backend data later) */}
          <ItemCard title="Grey Backpack" img="/sample/bag.jpg" />
          <ItemCard title="Set of Keys" img="/sample/keys.jpg" />
          <ItemCard title="Pair of Headphones" img="/sample/headphones.jpg" />
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-[#7132CA] font-medium hover:underline">
            View More •
          </Link>
        </div>
      </section>
    </div>
  );
}
