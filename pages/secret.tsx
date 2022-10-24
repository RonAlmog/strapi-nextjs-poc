import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Secret() {
  const { data: session, status } = useSession();
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/secret");
      const data = await res.json();

      if (data.content) {
        setContent(data.content);
      }
    };
    fetchData();
  }, [session]);

  // if (typeof window != "undefined") return null;

  if (!session) {
    return (
      <div>
        <h1>You are not signed in, please login</h1>
      </div>
    );
  }
  return (
    <main>
      <div>
        <h1>Protected page</h1>
        <p>{content}</p>
      </div>
    </main>
  );
}
