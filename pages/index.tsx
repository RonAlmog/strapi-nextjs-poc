import type { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { Post } from "../src/Post";

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
  return (
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
  );
};

export default Home;
