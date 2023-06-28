const express = require ('express');
const app = express();

app.use(express.json());


const restaurants = [];

// Get - /restaurant Funktion

app.get('/restaurants', (req, res) => {
    res.status(200).json(restaurants);
});

// Post - /restaurant Funktion

app.post('/restaurant', (req, res) => {
    const { name, adress, category } = req.body;
    
    if ( name && adress && category ) {
        const vorhandeneRestaurant = restaurants.find(restaurant => restaurant.name === name);
        if (vorhandeneRestaurant)   {
            res.status(409).json({message: 'Restaurant bereits vorhanden'});
        } else {
            const restaurant = { name, adress, category};
            restaurants.push(restaurant);
            res.status(201).json(restaurant);
        }
    } else {
        res.status(400).json({ message: 'Benötigte Angaben fehlen'});
    }
});

// GET - /restaurant/:name Funktion

app.get('/restaurant/:name', (req, res) => {
    const name = req.params.name;
    const restaurant = restaurants.find(restaurant => restaurant.name === name);

    if (restaurant) {
        res.json(restaurant);
    } else {
        res.status(404).json({ message: 'Restaurant nicht gefunden'});
    }
});

// PUT - /restaurant/:name Funktion

app.put('/restaurant/:name', (req, res) => {
    const name =req.params.name;
    const { adress, category } = req.body;
    const restaurant = restaurants.find(restaurant => restaurant.name === name);

    if (restaurant) {
        restaurant.adress = adress || restaurant.adress;
        restaurant.category = category || restaurant.category;
        res.json(restaurant);
    } else {
        res.status(404).json({ message: 'Restaurant nicht gefunden'});
    }
});

// DELETE - /restaurant/:name Funktion

app.delete('/restaurant/:name', (req, res) => {
    const name = req.params.name;
    const position = restaurants.findIndex(restaurant => restaurant.name === name);

    if (position !== -1) {
        const entfernteRestaurant = restaurants.splice(position, 1)[0];
        res.json(entfernteRestaurant);
    } else {
        res.status(404).json({ message: 'Restaurant nicht gefunden'});
    }
});

// Server starten

app.listen(3000, () => {
    console.log('Server aktiv auf 3000');
});