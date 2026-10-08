import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function DaylightChart({ daylightData }) {

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={daylightData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
                type="monotone"
                dataKey="daylight"
                dot={true}
            />
        </LineChart>
    </ResponsiveContainer>
    );
}

export default DaylightChart;