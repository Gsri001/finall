const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const { Pool } = require('pg');

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'jiraTicket',
  password: '',
  port: 5432,
});

app.post('/createIssue', async (req, res) => {
  try {
    const auth = {
      username: 'gsri4771@gmail.com',
      password: 'ATATT3xFfGF0nQw7UDb5VKvpzMSzjKoJdi373sIvZ0cIN07sZ4Mymjl7o6_eF55kw7lcnCCaeupNZdBbI-IT9Sm8QbRkyFKTY5ITAGV93U4neU40-o-2aoNkc38y0w0ld6JGYW7yGO6B5S39IMBedEdvSbAFz7chIqK0yxZMctLrt6elr6Rfass=6E8F8371'
    };

    const payload = {
      fields: req.body.fields
    };

    const response = await axios.post(apiUrl, payload, { auth });

    const client = await pool.connect();
    const query = 'INSERT INTO issues (key) VALUES ($1)';
    const values = [response.data.key];
    await client.query(query, values);
    client.release();

    res.json({ key: response.data.key });
  } catch (error) {
    console.error('Error creating Jira issue:', error.message);
    res.status(500).json({ error: 'Failed to create Jira issue' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
