import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

type Props = {};

const Protected = (props: Props) => {
  const { data: session, status } = useSession({ required: true });

  if (status === "authenticated") {
    return (
      <div>
        <p>Welcome {session?.user?.name}</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>You are not signed in</p>
      </div>
    );
  }
};

export default Protected;
