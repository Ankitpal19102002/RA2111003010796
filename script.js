async function submitJson() {
    const jsonInput = document.getElementById('jsonInput').value;
    try {
        const response = await fetch('http://localhost:3000/bfhl', {  // Replace with your actual backend URL if hosted
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonInput
        });
        const data = await response.json();
        document.getElementById('responseContainer').style.display = 'block';
        document.getElementById('responseOutput').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        alert('Invalid JSON or server error');
    }
}

function filterResponse() {
    const response = JSON.parse(document.getElementById('responseOutput').textContent);
    const selectedOptions = Array.from(document.getElementById('filterOptions').selectedOptions).map(option => option.value);
    let filteredResponse = {};
    if (selectedOptions.includes('Alphabets')) filteredResponse.alphabets = response.alphabets;
    if (selectedOptions.includes('Numbers')) filteredResponse.numbers = response.numbers;
    if (selectedOptions.includes('Highest alphabet')) filteredResponse.highest_alphabet = response.highest_alphabet;

    document.getElementById('responseOutput').textContent = JSON.stringify(filteredResponse, null, 2);
}
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;
        const user_id = "ankit_abhijit_pal_01011995";  // Example user_id, replace with actual data
        const email = "ankit@example.com";
        const roll_number = "CS101";

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
        const highest_alphabet = alphabets.length > 0 ? [alphabets.sort((a, b) => b.localeCompare(a))[0]] : [];

        res.json({
            is_success: true,
            user_id: user_id,
            email: email,
            roll_number: roll_number,
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highest_alphabet
        });
    } catch (error) {
        res.json({
            is_success: false,
            message: error.message
        });
    }
});

app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
