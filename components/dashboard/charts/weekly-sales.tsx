"use client";

import { TbCurrencyTaka } from 'react-icons/tb';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';

interface WeeklySalesProps {
    weeklySales: {
        day: string;
        sale: number;
    }[]
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const { day, sale } = payload[0].payload;
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#fff', color: "black", padding: '10px', border: '1px solid #ccc' }}>
                <p className="label">{`Day: ${day}`}</p>
                    <p className="flex items-center">
                        Sales:
                        <TbCurrencyTaka />
                        {sale}
                    </p>
            </div>
        );
    }

    return null;
};

export const WeeklySales = ({ weeklySales }: WeeklySalesProps) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={300} height={100} data={weeklySales}>
                <Line type="monotone" dataKey="sale" stroke="#8884d8" strokeWidth={2} />
                <Tooltip content={<CustomTooltip />} />
            </LineChart>
        </ResponsiveContainer>
    );
}
