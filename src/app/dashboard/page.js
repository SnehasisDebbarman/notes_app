"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

//components
import PostCard from "@/components/postCard";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [Posts, setPosts] = useState(["no post found"]);

  //localstorage value
  const [token, settoken] = useState(
    JSON.parse(localStorage.getItem("id_token"))
  );
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")));

  const [postTitle, setPostTitle] = useState("");
  const [Content, setContent] = useState("");

  useEffect(() => {
    settoken(JSON.parse(localStorage.getItem("id_token")));
    setuser(JSON.parse(localStorage.getItem("user")));
    setLoading(true);
    getPosts();
  }, []);
  const getPosts = () => {
    fetch("https://noteapi-3xb0.onrender.com/post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setPosts(response);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCreatePost = () => {
    let payload = JSON.stringify({
      title: postTitle,
      content: Content,
      author: user.username,
    });
    fetch("https://noteapi-3xb0.onrender.com/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload,
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <div>loading posts....</div>;
  }

  return (
    <main>
      <Navbar />
      <div className="p-8 mt-10">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginBottom: "30px",
            gap: "10px",
          }}
        >
          <h3>create Post</h3>
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="title"
            placeholder="heading"
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="content"
            placeholder="write your thoughts"
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleCreatePost}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            create post
          </button>
        </div>

        <h3 className="text-3xl font-bold underline">posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Posts.map((post) => {
            return (
              <div key={post._id} className="w-[100%] my-2 ">
                <PostCard
                  title={post.title}
                  content={post.cotent}
                  author={post.author}
                  date={post.date}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
