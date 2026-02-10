import express from 'express';
import dogFacts from './dog_facts.js';

const app = express();
const PORT = 3000;

app.get('/facts', (req, res) => {
  const { number } = req.query;

  if (!number) {
    return res.json({
      facts: dogFacts,
      success: true
    });
  }

  const parsedNumber = parseInt(number);

  if (isNaN(parsedNumber) || parsedNumber < 1) {
    return res.status(400).json({
      error: 'Query parameter "number" must be a positive integer.',
      success: false
    });
  }

  res.json({
    facts: dogFacts.slice(0, parsedNumber),
    success: true
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});