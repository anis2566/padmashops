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

    const todayOrderCount = todayOrders.length;
    const todayOrderTotal = todayOrders.filter(order => order.status === "delivered").reduce((sum, order) => sum + order.total, 0);
    const pendingOrderCount = todayOrders.filter(order => order.status === "pending").length
    const deliveredOrderCount = todayOrders.filter(order => order.status === "delivered").length
    const returnedOrderCount = todayOrders.filter(order => order.status === "returned").length

    const yesterdayOrderTotal = yesterdayOrders.reduce((sum, order) => sum + order.total, 0);
    const thisMonthOrderTotal = monthOrders.reduce((sum, order) => sum + order.total, 0);
    const thisWeekOrderTotal = weekOrders.filter(order => order.status === "delivered").reduce((sum, order) => sum + order.total, 0);

    // Function to format date as day name
    const getDayName = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    };

    // Array to hold sales data for each day of the week
    const weeklyStat = [];

    // Calculate sales data for each day of the week
    for (let i = 0; i < 7; i++) {
        const dayStart = new Date(startOfWeek);
        dayStart.setDate(dayStart.getDate() + i);

        const dayEnd = new Date(dayStart);
        dayEnd.setDate(dayEnd.getDate() + 1);

        const dayOrders = weekOrders.filter(order => 
            order.createdAt >= dayStart && order.createdAt < dayEnd
        );

        const dayTotalSales = dayOrders.filter(order => order.status === "delivered").reduce((sum, order) => sum + order.total, 0);
        const dayOrderCount = dayOrders.filter(order => order.status === "delivered").length;

        weeklyStat.push({
            day: getDayName(dayStart),
            sale: dayTotalSales,
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
        weeklyStat,
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