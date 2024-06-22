import { redirect } from "next/navigation"
import { Check, DollarSign, RefreshCcw, ShoppingCart, Truck } from "lucide-react"

import { BigCard } from "@/components/seller/card/big-card"
import { SmallCard } from "@/components/seller/card/small-card"
import { getSeller } from "@/services/user.services"
import { RecentOrders } from "@/components/seller/home/recent-orders"
import { db } from "@/lib/db"
import { MostSaleProducts } from "@/components/seller/home/most-sale-product"

const Dashboard = async () => {
    const { sellerId } = await getSeller()
    const bank = await db.bank.findUnique({
        where: {
            sellerId
        }
    })

    if (!bank) redirect("/")
    
    const orders = await db.sellerOrder.findMany({
        where: {
            sellerId,
        },
        include: {
            products: {
                include: {
                    product: {
                        select: {
                            featureImageUrl: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 3,
    });

    const mostSoldProducts = await db.sellerOrderProduct.groupBy({
        by: ['productId'],
        where: {
            order: {
                sellerId: sellerId,
                status: "delivered"
            },
        },
        _sum: {
            quantity: true,
        },
        orderBy: {
            _sum: {
                quantity: 'desc',
            },
        },
        take: 5,
    }).then(results => Promise.all(results.map(async result => {
        const product = await db.product.findUnique({ where: { id: result.productId } });
        return {
            name: product?.name || "",
            totalSell: result._sum.quantity ?? 0,
        };
    })));

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayFilter = {
        createdAt: {
            gte: today,
            lt: tomorrow,
        },
    };

    const [todayOrders, orderPending, orderDelivered, orderReturned] = await Promise.all([
        db.sellerOrder.count({
            where: todayFilter,
        }),
        db.sellerOrder.count({
            where: {
                ...todayFilter,
                status: "pending",
                sellerId
            },
        }),
        db.sellerOrder.count({
            where: {
                ...todayFilter,
                status: "delivered",
                sellerId
            },
        }),
        db.sellerOrder.count({
            where: {
                ...todayFilter,
                status: "returned",
                sellerId
            },
        }),
    ]);

    return (
        <main className="flex flex-1 flex-col gap-4 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <BigCard title="Current Balance" icon={DollarSign} value={bank.current} />
                <BigCard title="Pending Balance" icon={DollarSign} value={bank.pending} />
                <BigCard title="Withdraw" icon={DollarSign} value={bank.withdraw} />
                <BigCard title="Total Earning" icon={DollarSign} value={bank.total} />
            </div>

            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <SmallCard title="Today Orders" icon={ShoppingCart} value={todayOrders} />
                <SmallCard title="Order Pending" icon={RefreshCcw} value={orderPending} />
                <SmallCard title="Order Delivered" icon={Truck} value={orderDelivered} />
                <SmallCard title="Order Returned" icon={Check} value={orderReturned} />
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-3 md:gap-8">
                <RecentOrders orders={orders} />
                <MostSaleProducts products={mostSoldProducts} />
            </div>
        </main>
    )
}

export default Dashboard