import { NextApiRequest, NextApiResponse } from "next";

const Login = (req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json({
    name: "John Doe",
    email: "johndoe@gmail.com",
  });
};

export default Login;
