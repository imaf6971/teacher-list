import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Teacher List</title>
        <meta name="description" content="App for teachers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-100">
        <div className="w-11/12 rounded-lg border bg-white p-4 shadow transition-shadow">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-start gap-4"
          >
            <h1 className="text-xl font-medium">Sign in</h1>
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="login">Login</label>
              <input
                className="rounded-lg border border-neutral-300 p-2 transition-shadow hover:shadow focus:outline-none focus:ring"
                type="text"
                name="login"
                id="login"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                className="rounded-lg border border-neutral-300 p-2 transition-shadow hover:shadow focus:outline-none focus:ring"
                type="password"
                name="password"
                id="login"
              />
            </div>
            <button
              className="h-10 w-full rounded-lg border border-neutral-300 transition-colors hover:bg-blue-400 hover:text-neutral-50"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
