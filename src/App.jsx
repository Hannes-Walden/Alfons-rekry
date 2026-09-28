import { useState, useEffect } from "react";

console.log("App.jsx toimii!");

function App() {
    const [city, setCity] = useState("");
    const [cities, setCities] = useState([]);
    const [hoveredCity, setHoveredCity] = useState(null);
    const [daylightData, setDaylightData] = useState([]);

    useEffect(() => {
        console.log(daylightData);
    }, [daylightData]);

async function searchCity(cityName) {
    const response = await fetch(
        `http://localhost:8000/daylight.php?city=${cityName}`
    );

    const data = await response.json();

    const days = data.sun.days;

    setDaylightData(
        days.map((day) => {
            const sekunnit = day.day_length;
            const daylightHours = sekunnit / 3600;

            return {
                date: day.date,
                daylight: daylightHours
            };
        })
    );
}

    function addCity() {
        if (city.trim() === "") {
            return;
        }

        if (cities.includes(city)) {
            console.log("Already on the list");
            return;
        }

        setCities([...cities, city]);
        setCity("");

    }

    function removeCity(index) {
        setCities(cities.filter((_, i) => i !== index));
    }

        function handleCity() {
        const cityName = city;

        addCity();
        searchCity(cityName);
    }

    return (
        <>
            <h1>Daylight</h1>

            <p>
                Enter city name:
                <input
                    type="text"
                    placeholder="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </p>

            <button onClick={handleCity}>Enter</button>

            <ul>
                {cities.map((city, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <span
                            className="city-name"
                            onMouseEnter={() => setHoveredCity(city)}
                            onMouseLeave={() => setHoveredCity(null)}
                            >
                        {city}
                        </span>
                        <button onClick={() => removeCity(index)}>Remove</button>
                        {hoveredCity === city && (
                            <span className="ml-4">
                                kuvaaja kaupungille: {city}
                            </span>
                        )}
                    </li>
                ))}
            </ul>

        </>
    );

}

export default App;
