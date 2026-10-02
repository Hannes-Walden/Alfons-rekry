import { useState, useEffect } from "react";
import DaylightChart from "./DaylightChart";
import SelectYear from "./SelectYear";

console.log("App.jsx toimii!");

function App() {
    const [city, setCity] = useState("");
    const [cities, setCities] = useState([]);
    const [hoveredCity, setHoveredCity] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [daylightData, setDaylightData] = useState([]);
    const [cityData, setCityData] = useState({});
    const [error, setError] = useState("");
    const [year, setYear] = useState("2026");

useEffect(() => {
    if (selectedCity === null) {
        return;
    }

    const cacheKey = `${selectedCity}-${year}`;

    if (cityData[cacheKey]) {
        setDaylightData(cityData[cacheKey]);
    } else {
        searchCity(selectedCity, year);
    }
}, [selectedCity, year, cityData]);

async function searchCity(cityName, year) {
    const response = await fetch(
        `http://localhost:8000/daylight.php?city=${cityName}&year=${year}`
    );

    const data = await response.json();

    if (data.error) {
        setError(`Unknown city: ${cityName}`);
        return false;
    }

    setError("");

    const days = data.sun.days;

    const newData = days.map((day) => {
        
    if (day.day_length === null && 
        day.sunrise !== null &&
        day.sunset === null) {
        return {
            date: day.date,
            daylight: 24
        };
    }

        const seconds = day.day_length;
        const daylightHours = seconds / 3600;

        return {
            date: day.date,
            daylight: daylightHours
        };
    });

    const cacheKey = `${cityName}-${year}`;

    setCityData((oldData) => ({
        ...oldData,
        [cacheKey]: newData
    }));

    setDaylightData(newData);

    return true;
}

    function removeCity(index) {
        setCities(cities.filter((_, i) => i !== index));
    }

async function handleCity() {
    const cityName = city.trim();

    if (cityName === "") {
        return;
    }

    if (cities.includes(cityName)) {
        console.log("Already on the list");
        return;
    }

    const success = await searchCity(cityName, year);

    if (success) {
        setCities([...cities, cityName]);
        setCity("");
    }
}

    function resetChart() {
        setDaylightData([]);
        setSelectedCity(null);
        setCities([]);
        setError("");
        setHoveredCity(null);
        setCity("");
    }

    return (
        <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
            <h1 className="mb-6 text-3xl font-bold sm:text-4xl">Daylight</h1>

            <SelectYear
                year={year}
                setYear={setYear}
            />

            <p>
                Enter city name:
                <input
                    type="text"
                    placeholder="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={handleCity} className="rounded bg-blue-600 px-4 py-2 text-white">Enter</button>
            <button onClick={resetChart} className="rounded bg-gray-200 px-4 py-2">Reset</button>
            </div>

            <ul>
                {cities.map((city, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <span
                            className="city-name"
                            onMouseEnter={() => {
                                setHoveredCity(city);
                                setSelectedCity(city);
                            }}
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

            <div className="h-[300px] sm:h-[400px]">
            <DaylightChart daylightData={daylightData} />
            </div>

            {error && <p>{error}</p>}

            </div>
        </div>
    );

}

export default App;
