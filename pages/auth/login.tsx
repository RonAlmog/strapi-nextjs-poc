import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

type Props = {};

const Login = (props: Props) => {
  const { data: session } = useSession();
  console.log("session:", session);

  if (session) {
    return (
      <div>
        <p>
          Welcome, {session.user?.name}, {session.user?.email}
        </p>
        <img src={session.user?.image} alt={session.user?.name} />
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>You are not logged in</p>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    );
  }
};

export default Login;
