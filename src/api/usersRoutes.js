const express = require('express');
const { dbClient } = require('../config');

const userRoutes = express.Router();

// ROUTES
userRoutes.get('/pets/:order?', async (req, res) => {
  try {
    // prisijungti
    await dbClient.connect();
    console.log('connected');
    const petsArr = await dbClient
      .db('node8')
      .collection('pets')
      .find()
      .sort({ age: req.params.order?.toLowerCase() === 'dsc' ? -1 : 1 })
      .toArray();
    console.log('connected');
    res.json(petsArr);
    // atlikti veiksma
  } catch (error) {
    console.error('error in get pets', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});

userRoutes.post('/pets', async (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.type) {
    return res.status(400).send({ err: 'Incorrect data passed' });
  }

  try {
    // prisijungti
    const con = await dbClient.connect();
    console.log('connected');
    const petsArr = await con.db('node8').collection('pets').insertOne({
      name: req.body.name,
      type: req.body.type,
      age: req.body.age,
    });
    await con.close();
    return res.send(petsArr);
  } catch (error) {
    console.error('error in get pets', error);
    return res.status(500).send(error);
  }
});

module.exports = userRoutes;
