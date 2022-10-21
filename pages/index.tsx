import type { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { Post } from "../src/Post";
import { useSession, getSession, signIn, signOut } from "next-auth/react";

export const getStaticProps = async () => {
  console.log("im on serverz");
  const res = await axios.get("http://127.0.0.1:1337/api/posts?populate=*");

  console.log("mydata:", res.data);
  const posts: Post[] = res.data.data;
  return {
    props: { posts },
  };
};

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log("im on the client");
  const { data: session, status } = useSession();

  if (session) {
    return (
      <div>
        <p>
          Welcome, {session.user?.name}, {session.user?.email}
        </p>
        <img src={session.user?.image} alt={session.user?.name} />
        <br />
        <button onClick={() => signOut()}>Sign out</button>

        <div>
          {posts &&
            posts.map((post: any) => (
              <Link href={`/${post.attributes.slug}`} key={post.id}>
                <a>
                  <h2>{post.attributes.title}</h2>
                  <p>{post.attributes.slug}</p>
                  <p>{post.attributes.user.data.attributes.username}</p>
                </a>
              </Link>
            ))}
        </div>
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

export default Home;
