import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import { Post } from "../src/Post";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://127.0.0.1:1337/api/posts");
  const data = await res.json();
  const posts = data.data;
  // console.log("posts::>", posts);
  const paths = posts.map((post: any) => ({
    params: { slug: post.attributes.slug },
  }));
  console.log("paths:", paths);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  console.log("slug:", slug);

  const res = await fetch(
    `http://127.0.0.1:1337/api/posts?filters[slug][$eq]=${slug}`
  );
  const data = await res.json();
  const post = data.data[0];
  console.log("post:", post);

  return {
    props: { post },
  };
};

const PostPage = ({ post }: any) => {
  return <div>{post.attributes.title}</div>;
};

export default PostPage;

// tell next.js how many pages there are

// for each page, get the data
