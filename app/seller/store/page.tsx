import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { StoreProducts } from "@/components/seller/store";
import { db } from "@/lib/db";

interface Props {
  searchParams: {
      sort: string;
      page: string;
      perPage: string;
      search: string;
  }
};

const Store = async ({ searchParams }: Props) => {
    const {sort, search, page, perPage} = searchParams;
    const itemsPerPage = parseInt(perPage) || 12;  
    const currentPage = parseInt(page) || 1;

    const products = await db.product.findMany({
        where: {
            ...(search && {name: {contains: search, mode: "insensitive"}})
        },
        orderBy: {
            createdAt: sort === "asc" ? "asc" : "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalProduct = await db.product.count({
        where: {
            ...(search && {name: {contains: search, mode: "insensitive"}})
        }
    })

    const totalPage = Math.round(totalProduct / itemsPerPage)

    return (
        <div className="w-full space-y-4 px-2">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/seller">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Store</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <StoreProducts products={products} totalPage={totalPage} />
        </div>
    )
}

export default Store;