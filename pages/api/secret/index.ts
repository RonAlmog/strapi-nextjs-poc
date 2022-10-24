import { getSession } from "next-auth/react";

const Hello = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    res.send({
      content: "welcome to my secret page",
    });
  } else {
    res.send({
      error: "you need to be signed in",
    });
  }
};

export default Hello;
