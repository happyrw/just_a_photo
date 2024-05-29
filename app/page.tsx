import Categories from "@/components/categories";
import NavigationBar from "@/components/navigation-bar";
import PostsList from "@/components/posts-list";
import SearchInput from "@/components/search-input";
import { getAllPosts, getCategories } from "@/datas/post";
import { currentUser } from "@/lib/auth";
import { IoMenuOutline } from "react-icons/io5";

interface SearchPageProps {
  searchParams: {
    title?: string;
    categoryId?: string;
  }
}

export default async function Home({ searchParams }: SearchPageProps) {
  const user = await currentUser();

  const categories = await getCategories();
  // if (!categories) return null;

  const posts = await getAllPosts(searchParams);

  return (
    <main>
      <div className="mb-[90px]">
        <NavigationBar user={user!} />
      </div>
      <div className="flex">
        <Categories
          items={categories!}
        />
        <div className="flex flex-col w-full ml-0 sm:ml-[250px] md:ml-[250px] px-2">
          <div className="flex items-center gap-5 px-6 pt-2 md:hidden md:mb-0 w-full mb-2 ml-auto">
            <IoMenuOutline className="flex sm:hidden w-10 h-10 text-white cursor-pointer" />
            <SearchInput />
          </div>
          <PostsList items={posts} />
        </div>
      </div>
    </main>
  );
}
