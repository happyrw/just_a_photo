import { currentUser } from "@/lib/auth"
import { redirect } from "next/navigation";


const UpdatePostPage = async () => {
    const user = await currentUser();
    if (!user) {
        redirect("/");
    }
    return (
        <div>UpdatePostPage</div>
    )
}

export default UpdatePostPage