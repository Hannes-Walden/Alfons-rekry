import { useState } from "react";

function App() {
    const [city, setCity] = useState("");
    const [cities, setCities] = useState([]);

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
                    <li key={index}>
                        {city}
                        <button onClick={() => removeCity(index)}>Remove</button>
                    </li>
                ))}
            </ul>

        </>
    )

}

export default App;

