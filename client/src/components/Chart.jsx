import { PieChart, Pie, Cell, Legend } from "recharts";

function Chart({ totalIncome, totalExpense }) {
    const data = [
        { name: "Income", value: totalIncome },
        { name: "Expense", value: totalExpense }
    ];

    const COLORS = ["#00C49F", "#FF4444"];

    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
            >
                {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]}/>
                ))}
            </Pie>
            <Legend/>
        </PieChart>
    )
}

export default Chart;