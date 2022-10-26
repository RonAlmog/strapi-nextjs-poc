import React, { FC, useState, useEffect } from "react";
import {
  getProviders,
  signOut,
  signIn,
  useSession,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

const Signin = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setProviders(setupProviders);
    };
    setTheProviders();
  }, []);

  const { data: session, status } = useSession();
  console.log("providers:", providers);
  const email = "abc@gmail.com";

  if (status === "loading") {
    return <h2>Loading...</h2>;
  }

  if (session) {
    return (
      <>
        Signed in as {session.user?.name}, {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }
  return (
    <>
      <h2>Login</h2>
      {providers?.email && (
        <>
          <br />
          <button type="button" onClick={() => signIn("email", { email })}>
            Login with Email
          </button>
        </>
      )}
      {providers?.google && (
        <>
          <br />
          <button type="button" onClick={() => signIn("google")}>
            Login with Google
          </button>
        </>
      )}
      {providers?.github && (
        <>
          <br />
          <button type="button" onClick={() => signIn("github")}>
            Login with Github
          </button>
        </>
      )}
    </>
  );
};

export default Signin;
