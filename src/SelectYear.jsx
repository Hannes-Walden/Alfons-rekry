function SelectYear({ year, setYear}) {
    return (
        <div>
        <label>Select year: </label>

        <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="year"
        />
        </div>
    );
}

export default SelectYear;