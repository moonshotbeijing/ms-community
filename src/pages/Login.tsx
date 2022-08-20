import React from "react";
import { supabase } from "../api";

const Login = () => {
  async function signInWithGithub() {
    await supabase.auth.signIn({
      provider: "github",
    });
  }

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Welcome to Moonshot Factory
      </h1>
      <button
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={signInWithGithub}
      >
        Login with Github
      </button>
    </div>
  );
};

export default Login;
