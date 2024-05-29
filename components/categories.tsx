"use client"

import { Category } from "@prisma/client";

import CategoryItems from "./categories-items";

interface CategoriesProps {
    items: Category[];
}

const Categories = ({ items }: CategoriesProps) => {
    return (
        <div>
            <div className="fixed left-0  h-[100vh] w-[200px] sm:w-[250px] hidden overflow-x-auto bg-sky-800 sm:flex flex-col items-start gap-y-2 overflow-y-auto p-2 pl-5">
                {items.map((category) => (
                    <CategoryItems
                        key={category.id}
                        value={category.id}
                        label={category.name}
                    />
                ))}
            </div>
        </div>
    )
}

export default Categories;