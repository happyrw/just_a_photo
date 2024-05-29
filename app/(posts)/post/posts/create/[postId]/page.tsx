import PostUpload from '@/app/(posts)/_components/post-upload'
import NavigationBar from '@/components/navigation-bar'
import { Button } from '@/components/ui/button'
import { getCategories, getPostToCreateById } from '@/datas/post'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa'

const CreatePostPage = async (
    { params }: { params: { postId: string } }
) => {
    const user = await currentUser();
    if (!user) redirect("/");

    const post = await getPostToCreateById(params.postId, user.id);
    if (!post) return redirect("/");

    const categories = await getCategories();
    if (!categories) return redirect("/");

    return (
        <div>
            <div className="mb-[100px]">
                <NavigationBar user={user!} />
            </div>
            <div className="px-2 md:px-20 space-y-8">
                <PostUpload
                    postId={params.postId}
                    title={post.title}
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