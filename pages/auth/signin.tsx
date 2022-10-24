import React from "react";
import { getProviders, signIn, getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

type Props = {};

const Signin = ({ providers }) => {
  return (
    <>
      <h2>Login</h2>
      {Object.values(providers).map((provider: any) => {
        console.log("provider:", provider);
        return (
          <div key={provider.id}>
            <button onClick={() => signIn(provider.id)}>{provider.name}</button>
          </div>
        );
      })}
    </>
  );
};

export default Signin;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req, res } = context;
  const providers = await getProviders();
  console.log("providers:", providers);
  const session = await getSession({ req });
  if (session && res) {
    res.statusCode = 302;
    res.setHeader("location", "/");
    return {
      props: {
        session,
        providers,
      },
    };
  }

  return {
    props: { providers },
  };
};
