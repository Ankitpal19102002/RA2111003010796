const express = require('express');
const app = express();
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

const port = process.env.PORT || 3300;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
