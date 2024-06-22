"use server"

import { db } from "@/lib/db";

export const GET_ADMIN_DASHBOARD_DATA = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const startOfWeek = new Date(today);
    const dayOfWeek = startOfWeek.getDay();
    const diffToMonday = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when day is Sunday
    startOfWeek.setDate(diffToMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    const todayFilter = {
        createdAt: {
            gte: today,
            lt: tomorrow,
        },
    };

    const yesterdayFilter = {
        createdAt: {
            gte: yesterday,
            lt: today,
        },
    };

    const monthFilter = {
        createdAt: {
            gte: startOfMonth,
            lt: tomorrow, // Use tomorrow as the upper bound for the current month
        },
    };

    const weekFilter = {
        createdAt: {
            gte: startOfWeek,
            lt: tomorrow, // Use tomorrow as the upper bound for the current week
        },
    };

    const [todayOrders, yesterdayOrders, monthOrders, weekOrders] = await Promise.all([
        db.order.findMany({
            where: todayFilter,
        }),
        db.order.findMany({
            where: {
                ...yesterdayFilter,
                status: "delivered"
            }
        }),
        db.order.findMany({
            where: {
                ...monthFilter,
                status: "delivered"
            }
        }),
        db.order.findMany({
            where: weekFilter
        })
    ]);

    const [todaySellerOrders, yesterdaySellerOrders, monthSellerOrders, weekSellerOrders] = await Promise.all([
        db.sellerOrder.findMany({
            where: todayFilter,
        }),
        db.sellerOrder.findMany({
            where: {
                ...yesterdayFilter,
                status: "delivered"
            }
        }),
        db.sellerOrder.findMany({
            where: {
                ...monthFilter,
                status: "delivered"
            }
        }),
        db.sellerOrder.findMany({
            where: weekFilter
        })
    ]);

    const todayOrderCount = todayOrders.length + todaySellerOrders.length
    const todaySellerOrderTotal = todaySellerOrders.filter(order => order.status === "delivered").reduce((sum, order) => sum + order.total, 0);
    const todayOrderTotal = todayOrders.filter(order => order.status === "delivered").reduce((sum, order) => sum + order.total, 0) + todaySellerOrderTotal

    const todaySellerPendingOrder = todaySellerOrders.filter(order => order.status === "pending").length
    const pendingOrderCount = todayOrders.filter(order => order.status === "pending").length + todaySellerPendingOrder
    const todaySellerDeliveredOrder = todaySellerOrders.filter(order => order.status === "delivered").length
    const deliveredOrderCount = todayOrders.filter(order => order.status === "delivered").length + todaySellerDeliveredOrder
    const todaySellerReturnedOrder = todaySellerOrders.filter(order => order.status === "returned").length
    const returnedOrderCount = todayOrders.filter(order => order.status === "returned").length + todaySellerReturnedOrder

    const yesterdaySellerOrderTotal = yesterdaySellerOrders.reduce((sum, order) => sum + order.total, 0);
    const yesterdayOrderTotal = yesterdayOrders.reduce((sum, order) => sum + order.total, 0) + yesterdaySellerOrderTotal

    const thisMonthSellerOrderTotal = monthSellerOrders.reduce((sum, order) => sum + order.total, 0);
    const thisMonthOrderTotal = monthOrders.reduce((sum, order) => sum + order.total, 0) + thisMonthSellerOrderTotal

    const thisWeekSellerOrderTotal = weekSellerOrders.filter(order => order.status === "delivered").reduce((sum, order) => sum + order.total, 0);
    const thisWeekOrderTotal = weekOrders.filter(order => order.status === "delivered").reduce((sum, order) => sum + order.total, 0) + thisWeekSellerOrderTotal

    // Function to format date as day name
    const getDayName = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    };

    // Array to hold sales data for each day of the week
    const weeklyOrderStat = [];
    const weeklySellerOrderStat = [];

    // Calculate sales data for each day of the week
    for (let i = 0; i < 7; i++) {
        const dayStart = new Date(startOfWeek);
        dayStart.setDate(dayStart.getDate() + i);

        const dayEnd = new Date(dayStart);
        dayEnd.setDate(dayEnd.getDate() + 1);

        const dayOrders = weekOrders.filter(order => 
            order.createdAt >= dayStart && order.createdAt < dayEnd
        );

        const dayOrderCount = dayOrders.filter(order => order.status === "delivered").length;

        weeklyOrderStat.push({
            day: getDayName(dayStart),
            order: dayOrderCount,
        });
    }

    for (let i = 0; i < 7; i++) {
        const dayStart = new Date(startOfWeek);
        dayStart.setDate(dayStart.getDate() + i);

        const dayEnd = new Date(dayStart);
        dayEnd.setDate(dayEnd.getDate() + 1);

        const dayOrders = weekSellerOrders.filter(order => 
            order.createdAt >= dayStart && order.createdAt < dayEnd
        );

        const dayOrderCount = dayOrders.filter(order => order.status === "delivered").length;

        weeklySellerOrderStat.push({
            day: getDayName(dayStart),
            order: dayOrderCount,
        });
    }

    const mostSaleProducts = await db.product.findMany({
        orderBy: {
            totalSell: "desc"
        },
        take: 4,
        select: {
            name: true,
            totalSell: true
        }
    })

    return { 
        todayOrderCount, 
        todayOrderTotal, 
        yesterdayOrderTotal, 
        thisMonthOrderTotal, 
        thisWeekOrderTotal,
        pendingOrderCount,
        deliveredOrderCount,
        returnedOrderCount,
        weeklyOrderStat,
        weeklySellerOrderStat,
        mostSaleProducts
    };
}


export const GET_RECENT_ORDERS = async () => {
    const orders = await db.order.findMany({
        include: {
            shippingInfo: {
                select: {
                    name: true
                }
            },
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
        take: 5
    })

    return {orders}
}