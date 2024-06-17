"use client"

import { PieChart, Pie, Cell, ResponsiveContainer,Tooltip } from 'recharts';

interface MostSaleProductsProps {
    products: {
        name: string;
        totalSell: number;
    }[]
}

export const MostSaleProducts = ({ products }: MostSaleProductsProps) => {
    const formatedProducts = products.map(product => ({name: product.name.slice(0, 25), totalSell: product.totalSell}))

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: { cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number, index: number }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
    return (
        <div className="flex flex-col space-y-4 w-full min-h-[300px] rounded-lg border bg-card text-card-foreground shadow-sm p-3">
          <p className="text-xl font-bold">Most sale products</p>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
            <Pie
                data={formatedProducts}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="totalSell"
            >
                {formatedProducts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            </PieChart>
        </ResponsiveContainer>
        </div>
    )
}