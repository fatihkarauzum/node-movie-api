const express = require('express');
const router = express.Router();

// Models
const Movie = require('../models/Movie');

router.get('/', (req, res, next) => {
  const promise = Movie.find({ });
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/:movie_id', (req, res, next) => {
  const promise = Movie.findById(req.param.movie_id);
  promise.then((movie) => {
    if(!movie)
      next({ message: 'The movie was not found.', code: 99 });

    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

router.post('/', (req, res, next) => {
  // const { title, imdb_score, category, country, year } = req.body;
  
  const movie = new Movie(req.body);
  const promise = movie.save();

  promise.then(() => {
    res.json({ status: 1 });
  }).catch((err) => {
    res.json(err);
  });

  // movie.save((err, data) => {
  //   if(err)
  //     res.json(err);

  //   res.json({ status: 1 });
  // });

});

module.exports = router;