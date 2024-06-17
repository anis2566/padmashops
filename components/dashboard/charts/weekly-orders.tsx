"use client";

import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';

interface WeeklySalesProps {
    weeklyOrders: {
        day: string;
        order: number;
    }[]
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const { day, order } = payload[0].payload;
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#fff', color: "black", padding: '10px', border: '1px solid #ccc' }}>
                <p className="label">{`Day: ${day}`}</p>
                <p className="intro">{`Orders: ${order}`}</p>
            </div>
        );
    }

    return null;
};

export const WeeklyOrders = ({ weeklyOrders }: WeeklySalesProps) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={300} height={100} data={weeklyOrders}>
                <Line type="monotone" dataKey="order" stroke="#8884d8" strokeWidth={2} />
                <Tooltip content={<CustomTooltip />} />
            </LineChart>
        </ResponsiveContainer>
    );
}
