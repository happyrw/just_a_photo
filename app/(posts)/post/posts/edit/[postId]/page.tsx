import PostEdit from '@/app/(posts)/_components/post-edit'
import NavigationBar from '@/components/navigation-bar'
import { getCategories, getPostToUpdateById } from '@/datas/post'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

const CreatePostPage = async (
    { params }: { params: { postId: string } }
) => {
    const user = await currentUser();
    if (!user) redirect("/");

    const post = await getPostToUpdateById(params.postId, user.id);
    if (!post) return redirect("/");

    console.log("post to update", post);

    const categories = await getCategories();
    if (!categories) return redirect("/");

    return (
        <div>
            <div className="mb-[100px]">
                <NavigationBar user={user!} />
            </div>
            <div className="px-2 md:px-20 space-y-8">
                <PostEdit
                    postId={params.postId}
                    post={post}
                    options={categories?.map((category) => ({
                        label: category.name,
                        value: category.id,
                    }))}
                />
            </div>
        </div>
    )
}

export default CreatePostPage;