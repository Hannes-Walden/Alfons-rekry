import { useState, useEffect } from "react";

console.log("App.jsx toimii!");

function App() {
    const [city, setCity] = useState("");
    const [cities, setCities] = useState([]);
    const [hoveredCity, setHoveredCity] = useState(null);

    function addCity() {
        if (city.trim() === "") {
            return;
        }

        setCities([...cities, city]);
        setCity("");

    }

    function removeCity(index) {
        setCities(cities.filter((_, i) => i !== index));
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

            <button onClick={addCity}>Enter</button>

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

