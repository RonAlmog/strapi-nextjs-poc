import React from "react";
import { useSession, getSession, signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

type Props = {};

const Protected2 = (props: Props) => {
  const { data: session, status } = useSession();

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

export default Protected2;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
      },
    };
  }
  return {
    props: { session },
  };
};
