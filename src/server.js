import express from 'express';
import path, { dirname } from 'path';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
import router from './routes.js';

dotenv.config();
const accessToken = process.env.ACCESS_TOKEN;
const soapBoxURL = process.env.SOAPBOX_URL;

const app = express();
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.engine('.handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.get('/get-customer/:customerID', async (req, res) => {
  const { customerID } = req.params;
  try {
    await fetch(`${soapBoxURL}/customer?id=${customerID}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((data) => {
        res.json(data);
      });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post('/create-customer', async (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body;
  const postData = {
    firstName,
    lastName,
    email,
    phoneNumber,
  };
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(postData),
  };
  try {
    await fetch(`${soapBoxURL}/customer`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        res.json(data);
      });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post('/schedule-appointment', async (req, res) => {
  const { customerId, timestamp, title, prettyDestination } = req.body;
  const postData = {
    customerId,
    timestamp,
    command: 'jds-dial',
    destination: '1111',
    title,
    prettyDestination,
  };
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(postData),
  };
  try {
    await fetch(`${soapBoxURL}/schedule`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        res.json(data);
      });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
