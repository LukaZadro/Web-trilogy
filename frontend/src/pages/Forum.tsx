/*import React, { useEffect, useState } from "react";

type Comment = {
  id: string;
  text: string;
  createdAt: string;
};

type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  comments: Comment[];
};

const STORAGE_KEY = "forum_posts_v1";

const uid = () => Math.random().toString(36).slice(2, 9);

const loadPosts = (): Post[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as Post[] : [];
  } catch {
    return [];
  }
};

const savePosts = (posts: Post[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

const Forum: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selected, setSelected] = useState<Post | null>(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setPosts(loadPosts());
  }, []);

  useEffect(() => {
    savePosts(posts);
  }, [posts]);

  const createPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    const newPost: Post = {
      id: uid(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setTitle("");
    setContent("");
    setSelected(newPost);
  };

  const addComment = (postId: string) => {
    if (!commentText.trim()) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: [...p.comments, { id: uid(), text: commentText.trim(), createdAt: new Date().toISOString() }] }
          : p
      )
    );
    setCommentText("");
    // refresh selected to show the new comment
    setSelected((s) => (s && s.id === postId ? { ...s, comments: [...s.comments, { id: uid(), text: commentText.trim(), createdAt: new Date().toISOString() }] } : s));
  };

  const deletePost = (postId: string) => {
    if (!confirm("Obrisati objavu?")) return;
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    if (selected?.id === postId) setSelected(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Forum</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <form onSubmit={createPost} className="mb-6 bg-card p-4 rounded shadow">
            <h2 className="font-medium mb-2">Nova objava</h2>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Naslov"
              className="w-full border rounded px-3 py-2 mb-2"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Sadržaj..."
              className="w-full border rounded px-3 py-2 mb-2"
              rows={4}
            />
            <div className="flex gap-2">
              <button className="bg-primary text-white px-4 py-2 rounded" type="submit">Objavi</button>
              <button type="button" className="px-4 py-2 rounded border" onClick={() => { setTitle(""); setContent(""); }}>Očisti</button>
            </div>
          </form>

          <div className="space-y-4">
            {posts.length === 0 && <div className="text-muted">Još nema objava.</div>}
            {posts.map((p) => (
              <article key={p.id} className="bg-card p-4 rounded shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-muted">{new Date(p.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setSelected(p)} className="text-primary underline text-sm">Otvori</button>
                    <button onClick={() => deletePost(p.id)} className="text-red-500 text-sm">Obriši</button>
                  </div>
                </div>
                <p className="mt-2 line-clamp-3">{p.content}</p>
                <div className="mt-2 text-sm text-muted">{p.comments.length} komentara</div>
              </article>
            ))}
          </div>
        </div>

        <aside>
          <div className="bg-card p-4 rounded shadow">
            <h4 className="font-medium mb-2">Najnovije</h4>
            <ul className="space-y-2 text-sm">
              {posts.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <button className="text-left w-full" onClick={() => setSelected(p)}>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-muted text-xs">{new Date(p.createdAt).toLocaleString()}</div>
                  </button>
                </li>
              ))}
              {posts.length === 0 && <li className="text-muted">Nema objava</li>}
            </ul>
          </div>
        </aside>
      </div>

      {/* Modal / Drawer for selected post */   
      
      /*}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
          <div className="relative z-10 w-full max-w-2xl mx-4 bg-card p-6 rounded shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{selected.title}</h2>
                <div className="text-sm text-muted">{new Date(selected.createdAt).toLocaleString()}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setSelected(null)} className="text-foreground">Zatvori</button>
                <button onClick={() => deletePost(selected.id)} className="text-red-500">Obriši</button>
              </div>
            </div>

            <div className="mt-4">
              <p className="whitespace-pre-wrap">{selected.content}</p>
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Komentari ({selected.comments.length})</h3>
              <div className="space-y-3 mb-3">
                {selected.comments.map((c) => (
                  <div key={c.id} className="p-3 bg-muted/10 rounded">
                    <div className="text-sm text-muted">{new Date(c.createdAt).toLocaleString()}</div>
                    <div>{c.text}</div>
                  </div>
                ))}
                {selected.comments.length === 0 && <div className="text-muted">Još nema komentara</div>}
              </div>

              <div className="flex gap-2">
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 border rounded px-3 py-2"
                  placeholder="Napišite komentar..."
                />
                <button
                  onClick={() => {
                    addComment(selected.id);
                    // reload selected from posts to ensure up-to-date
                    setSelected((s) => posts.find((p) => p.id === s?.id) ?? null);
                  }}
                  className="bg-primary text-white px-4 py-2 rounded"
                >
                  Pošalji
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forum;*/

/*

import { Search } from 'lucide-react';  // lucide-react icon component for the search icon
import { useState } from 'react';

function Forum() {
  // Example JSON data for forum posts (with one sample comment per post)
  const [posts] = useState([
    {
      id: 1,
      title: "Welcome to the forum",
      content: "Hello and welcome to our forum. Feel free to share any ideas or questions here.",
      author: "Alice",
      date: "2025-11-07",
      comments: [
        { id: 101, postId: 1, content: "Thanks for starting the forum!", author: "Bob", date: "2025-11-07" }
      ]
    },
    {
      id: 2,
      title: "Project Ideas",
      content: "Let's discuss project ideas here. Perhaps we can start by sharing our current interests and see if we can collaborate.",
      author: "Bob",
      date: "2025-11-06",
      comments: []
    }
    // ...more posts
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const currentUser = "Alice";    // example logged-in username
  const isLoggedIn = true;        // simulate an authenticated user

  // Filter posts by title or author based on search query
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {/* Search bar with icon */
    
    /*}
      <div className="relative mb-4">
        <Search className="absolute w-5 h-5 text-gray-500 left-3 top-1/2 -translate-y-1/2" />
        <input 
          type="text"
          placeholder="Search posts by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isLoggedIn && (
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700">
          Add New Post
        </button>
      )}

      {filteredPosts.map(post => (
        <div key={post.id} className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
          <p className="text-gray-700 mb-2">
          
            {post.content.split(' ').slice(0, 12).join(' ')}...
          </p>
          <div className="text-sm text-gray-500 mb-2">
            By {post.author} on {post.date}
          </div>
          <div className="flex space-x-4 text-sm">
            <button className="text-blue-600 hover:underline">Read more</button>
            <button className="text-blue-600 hover:underline">Comment</button>
            {isLoggedIn && currentUser === post.author && (
              <>
                <button className="text-blue-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Forum;*/

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User2, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

const Forum = () => {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Replace with real auth logic

  useEffect(() => {
    // Simulate fetch
    const samplePosts: Post[] = [
      {
        id: 1,
        title: "Kako pronaći mentora?",
        content: "Pozdrav svima, zanima me kako mogu pronaći mentora za diplomski rad...",
        author: "student123",
        date: "2025-11-05",
      },
      {
        id: 2,
        title: "Preporuke za pripravnički staž",
        content: "Bok! Ima li netko preporuke za dobre tvrtke za odraditi pripravnički?",
        author: "marija.hr",
        date: "2025-11-06",
      },
    ];
    setPosts(samplePosts);
  }, []);

  const filteredPosts = posts.filter((post) =>
    `${post.title} ${post.content} ${post.author}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-[180px] pb-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Forum
            </h1>
            <p className="text-xl text-muted-foreground">
              Sudjeluj u raspravama, podijeli savjete ili potraži podršku. Forum je
              mjesto za sve studente i alumnije Sveučilišta u Zagrebu.
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Pretraži postove, autore, sadržaj..."
              className="pl-12 h-12 shadow-soft"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Create Post */}
          {isLoggedIn && (
            <div className="flex justify-end">
              <Button className="mt-4">Napiši novi post</Button>
            </div>
          )}

          {/* Posts */}
          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Card key={post.id} className="shadow-soft hover:shadow-medium transition-all duration-300">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="space-y-2">
                        <CardTitle className="text-2xl">{post.title}</CardTitle>
                        <CardDescription className="text-base">{post.author}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {post.content.slice(0, 150)}...
                    </p>
                    {isLoggedIn && (
                      <div className="flex flex-wrap justify-end gap-2">
                        <Button variant="secondary">Saznaj više</Button>
                        <Button>Komentiraj</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground">Nema pronađenih postova.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Forum;

