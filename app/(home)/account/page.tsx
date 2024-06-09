import { OrderList } from "@/components/home/account/order-list";
import { Reviews } from "@/components/home/account/reviews";
import { Wishlist } from "@/components/home/account/wishlist";
import { BigCard } from "@/components/home/card/big-card";
import { db } from "@/lib/db";
import { getUser } from "@/services/user.services";
import { ShoppingCart } from "lucide-react";

const Account = async () => {
    const {userId} = await getUser()

    const orders = await db.order.findMany({
        where: {
            userId
        },
        include: {
            products: {
                include: {
                    product: true
                }
            },
            user: true
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 3
    })

    return (
        <main className="flex flex-1 flex-col gap-4 md:gap-8 px-4">
            <div className="grid gap-4 md:grid-cols-3">
                <BigCard title="Today Orders" icon={ShoppingCart} value={530} />
                <BigCard title="Pending Orders" icon={ShoppingCart} value={1560} />
                <BigCard title="Total Orders" icon={ShoppingCart} value={4560} />
            </div>

            <OrderList orders={orders} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Wishlist />
                <Reviews />
            </div>
        </main>
    )
}

export default Account; 