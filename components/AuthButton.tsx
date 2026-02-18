"use client";

import { supabase } from "@/lib/supabaseClient";

export default function AuthButton({ user }: any) {
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="mb-6 text-center">
      {user ? (
        <>
          <p className="mb-2">Logged in as {user.email}</p>
          <button
            onClick={signOut}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={signIn}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login with Google
        </button>
      )}
    </div>
  );
}
