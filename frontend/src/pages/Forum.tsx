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
