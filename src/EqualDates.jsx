function EqualDates({ daylightData, cities }) {
    const tolerance = 1 / 60;

    if (cities.length < 2) {
        return (
             <p>
                Add at least two cities.
            </p>
        );
    }

    const equalDates = daylightData.filter((day) => {
        const values = cities.map((city) => day[city]);

        if (!values.every((value) => Number.isFinite(value))) {
            return false;
        }

        const shortestDay = Math.min(...values);
        const longestDay = Math.max(...values);

        return longestDay - shortestDay <= tolerance;
    });

    function formatDate(date) {
        const [year, month, day] = date.split("-");

        const monthName = new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
        ).toLocaleString("en-US", { month: "long" });

        return `${year}, ${monthName}, ${Number(day)}`;
    }

    return (
        <section className="mt-6">
            <h2 className="mb-3 text-xl font-bold">
                Equal daylight duration
            </h2>

            {equalDates.length === 0 ? (
                <p>
                    No dates found.
                </p>
            ) : (
                <ul className="list-disc space-y-1 pl-6">
                    {equalDates.map((day) => {
        const averageDaylight =
        cities.reduce((sum, city) => sum + day[city], 0)
        / cities.length;

    const totalMinutes = Math.round(averageDaylight * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return (
        <li key={day.date}>
            {formatDate(day.date)} — {hours} h{" "}
            {String(minutes).padStart(2, "0")} min
        </li>
        );
        })}
            </ul>
            )}
        </section>
    );
}

export default EqualDates;