"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AddBookmark from "@/components/AddBookmark";
import BookmarkList from "@/components/BookmarkList";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Navbar */}
      <div className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Smart Bookmark</h1>

        {user && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="font-medium text-gray-700 hover:text-black transition"
            >
              {user.user_metadata?.full_name || user.email}
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl border overflow-hidden">
                <button
                  onClick={signOut}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      {user ? (
        <div className="max-w-3xl mx-auto mt-12 bg-white p-10 rounded-2xl shadow-xl">
          <AddBookmark user={user} />
          <BookmarkList user={user} />
        </div>
      ) : (
        <div className="flex items-center justify-center mt-32">
          <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Welcome 👋
            </h2>
            <p className="text-gray-600 mb-6">
              Save and manage your bookmarks securely.
            </p>
            <button
              onClick={signIn}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Login with Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
