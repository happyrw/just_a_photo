import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";

interface CategoriesProps {
    label?: string;
    value?: string;
}

const CategoryItems = ({ label, value }: CategoriesProps) => {
    const searchparams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const currentCategoryId = searchparams.get("categoryId");
    const currentTitle = searchparams.get("title");

    const isSelected = currentCategoryId === value;

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                categoryId: isSelected ? null : value,
            }
        }, { skipNull: true, skipEmptyString: true });

        router.push(url);
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "w-full py-2 px-3 text-sm border hover:border-slate-200 rounded-md border-sky-700 transition flex items-start text-white/95 font-bold",
                isSelected && "border-orange-200 text-white bg-sky-700"
            )}
        >
            <p className="truncate">{label}</p>
        </button>
    )
}

export default CategoryItems;