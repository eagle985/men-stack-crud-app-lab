require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require('mongoose')
const methodOverride= require("method-override")


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride ("_method"))

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });
  mongoose.connection.on("error", (err) => {
    console.log(`Failed to connect due to ${err}.`);
  });

const Car = require("./vehicles/cars.js");

app.get("/", (req, res) => {
    res.render("index.ejs");
});

//ROUTES
app.get('/cars', async (req, res) => {
    const cars = await Car.find({}) 
    res.render('cars/index.ejs', {
        title: 'This is the Cars page',
        allCars: cars
    })
})


app.get('/cars/new', (req, res) => {
    res.render("cars/new.ejs");
});

app.delete("/cars/:id", (req, res) =>{
    Car.findByIdAndDelete(req.params.id)
    .then((responseFromDB) => {
        console.log(responseFromDB)
        res.redirect('/cars')
    })
})

app.put('/cars/:id', async (req, res) =>{
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new:true
    })
    res.redirect(`/cars/${req.params.id}`)
  })


app.post('/cars', async (req, res) =>{
    const car = await Car.create(req.body);
    res.redirect('/cars')
});


app.get('/cars/:id/edit', async (req, res) =>{
    const car = await Car.findById(req.params.id)
    res.render('cars/edit.ejs', {
      car
    })
  })

  app.get('/cars/:id', async (req, res) =>{
    const car = await Car.findById(req.params.id)
    res.render('cars/show.ejs', {
     car,
    })
  })  
  
app.listen(3000, () =>
    console.log("Building a CRUD Cars app using port 3000")
);
