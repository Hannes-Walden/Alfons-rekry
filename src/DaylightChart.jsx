import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const lineColors = [
    "#2563eb", // sininen
    "#dc2626", // punainen
    "#16a34a", // vihreä
    "#9333ea", // violetti
    "#ea580c", // oranssi
    "#0891b2", // turkoosi
    "#db2777", // pinkki
    "#854d0e", // ruskea
    "#4f46e5", // indigo
    "#65a30d", // limenvihreä
    "#be123c", // tumma pinkki
    "#0f766e", // tumma turkoosi
    "#7c3aed", // kirkas violetti
    "#ca8a04", // kulta
    "#475569", // siniharmaa
    "#c2410c", // tumma oranssi
    "#15803d", // tumma vihreä
    "#a21caf", // magenta
    "#0369a1", // teräksensininen
    "#57534e"  // harmaanruskea
];

function DaylightChart({ daylightData, cities, hoveredCity }) {

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={daylightData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                dataKey="date"
                tickFormatter={(date) => {
                const [year, month, day] = date.split("-");

                const monthName = new Date(
                Number(year),
                Number(month) - 1,
                Number(day)
                ).toLocaleString("en-US", { month: "long" });

                return `${year}, ${monthName}, ${Number(day)}`;
                }}
                />
                <YAxis
                tickFormatter={(hours) => `${hours} h`}
                />

                <Tooltip
                formatter={(value, name) => {
                const totalMinutes = Math.round(Number(value) * 60);
                const hours = Math.floor(totalMinutes / 60);
                const minutes = totalMinutes % 60;

                return [`${hours} h ${minutes} min`, name];
                }}
                labelFormatter={(date) => {
                const [year, month, day] = date.split("-");

                const monthName = new Date(
                Number(year),
                Number(month) - 1,
                Number(day)
                ).toLocaleString("en-US", { month: "long" });

                return `${year}, ${monthName}, ${Number(day)}`;
                }}
                />

                {cities.map((city, index) => (
                <Line
                key={city}
                type="monotone"
                dataKey={city}
                name={city}
                stroke={lineColors[index % lineColors.length]}
                strokeWidth={hoveredCity === city ? 4 : 2}
                strokeOpacity={
                hoveredCity && hoveredCity !== city ? 0.25 : 1
                }
                dot={false}
            />
        ))}
            </LineChart>
        </ResponsiveContainer>
    );
}

export default DaylightChart;