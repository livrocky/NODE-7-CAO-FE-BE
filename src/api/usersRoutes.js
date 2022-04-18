const express = require('express');
const { dbClient } = require('../config');

const userRoutes = express.Router();

// ROUTES
userRoutes.get('/pets', async (req, res) => {
  try {
    // prisijungti
    await dbClient.connect();
    console.log('connected');
    res.json('get pets route');
    // atlikti veiksma
  } catch (error) {
    console.error('error in get pets', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});

module.exports = userRoutes;
