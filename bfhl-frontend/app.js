import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const res = await axios.post('https://your-backend-url.herokuapp.com/bfhl', JSON.parse(jsonInput));
            setResponse(res.data);
        } catch (error) {
            console.error("Invalid JSON or server error", error);
        }
    };

    const handleChange = (e) => {
        setSelectedOptions([...e.target.selectedOptions].map(o => o.value));
    };

    const renderResponse = () => {
        if (!response) return null;

        let filteredResponse = {};
        if (selectedOptions.includes('Alphabets')) filteredResponse.alphabets = response.alphabets;
        if (selectedOptions.includes('Numbers')) filteredResponse.numbers = response.numbers;
        if (selectedOptions.includes('Highest alphabet')) filteredResponse.highest_alphabet = response.highest_alphabet;

        return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
    };

    return (
        <div>
            <h1>{response?.roll_number || 'BFHL Challenge'}</h1>
            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON here'
                rows={10}
                cols={50}
            />
            <button onClick={handleSubmit}>Submit</button>

            {response && (
                <div>
                    <label>Select data to display: </label>
                    <select multiple onChange={handleChange}>
                        <option value="Alphabets">Alphabets</option>
                        <option value="Numbers">Numbers</option>
                        <option value="Highest alphabet">Highest alphabet</option>
                    </select>
                    {renderResponse()}
                </div>
            )}
        </div>
    );
};

export default App;
