import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

export default function MyAccount() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loader />;
  if (!user) return <div className="text-center p-20 dark:text-white bg-white dark:bg-black min-h-screen transition-colors">Login to view profile.</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white pt-20 px-6 transition-colors duration-500">
      <div className="max-w-3xl mx-auto">
        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-[40px] overflow-hidden shadow-2xl transition-all">
          <div className="h-40 bg-gradient-to-br from-maroon to-crimson" />
          
          <div className="px-10 pb-10">
            <div className="relative -mt-16 mb-6">
              <div className="w-32 h-32 bg-white dark:bg-zinc-800 border-8 border-zinc-50 dark:border-zinc-900 rounded-full flex items-center justify-center text-4xl font-black text-crimson shadow-xl">
                {user.name.charAt(0)}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-black tracking-tight uppercase">{user.name}</h1>
                <p className="text-crimson font-bold text-sm tracking-widest uppercase">{user.email}</p>
              </div>
              <Link 
                to="/items?filter=mine" 
                className="block w-full bg-zinc-900 dark:bg-white text-white dark:text-black text-center py-4 rounded-2xl font-black hover:scale-105 transition-transform uppercase tracking-tighter"
                >
                View My Postings
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}