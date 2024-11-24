const axios = require('axios');

async function grading(answer, question) {
    const url = 'http://localhost:8080/api/llm/grading';
    const data = {
        answer: answer,
        question: question
    };

    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export { grading };