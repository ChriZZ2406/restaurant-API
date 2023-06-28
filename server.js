const express = require('express');

const app = express();
const port = 3000;

// Liste der Restaurants im Speicher
let restaurantList = [

];

// REST-API-Endpunkte

// Middleware für die Verarbeitung des Anfragekörpers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GET-Endpunkt: Gibt die Liste aller Restaurants zurück
app.get('/restaurants', (req, res) => {
  res.json(restaurantList);
});

// POST-Endpunkt: Fügt ein neues Restaurant hinzu
app.post('/restaurants', (req, res) => {
  const { name, address, category } = req.body;
  if (name && address && category) {
    const existingRestaurant = restaurantList.find(restaurant => restaurant.name === name);
    if (existingRestaurant) {
      res.status(409).send('Restaurant existiert bereits.');
    } else {
      restaurantList.push({ name, address, category });
      res.send('Restaurant erfolgreich hinzugefügt.');
    }
  } else {
    res.status(400).send('Ungültige oder fehlende Restaurantdetails.');
  }
});

// GET-Endpunkt: Gibt ein einzelnes Restaurant anhand des Namens zurück
app.get('/restaurants/:name', (req, res) => {
  const { name } = req.params;
  const restaurant = restaurantList.find(restaurant => restaurant.name === name);
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).send('Restaurant nicht gefunden.');
  }
});

// PUT-Endpunkt: Aktualisiert ein Restaurant anhand des Namens
app.put('/restaurants/:name', (req, res) => {
  const { name } = req.params;
  const { address, category } = req.body;
  const restaurantIndex = restaurantList.findIndex(restaurant => restaurant.name === name);
  if (restaurantIndex !== -1) {
    restaurantList[restaurantIndex].address = address || restaurantList[restaurantIndex].address;
    restaurantList[restaurantIndex].category = category || restaurantList[restaurantIndex].category;
    res.send('Restaurant erfolgreich aktualisiert.');
  } else {
    res.status(404).send('Restaurant nicht gefunden.');
  }
});

// DELETE-Endpunkt: Löscht ein Restaurant anhand des Namens
app.delete('/restaurants/:name', (req, res) => {
  const { name } = req.params;
  const restaurantIndex = restaurantList.findIndex(restaurant => restaurant.name === name);
  if (restaurantIndex !== -1) {
    const deletedRestaurant = restaurantList.splice(restaurantIndex, 1);
    res.json(deletedRestaurant[0]);
  } else {
    res.status(404).send('Restaurant nicht gefunden.');
  }
});

// Startet den Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
