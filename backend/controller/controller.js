const express = require('express');
const models = require('../models');



const router = express.Router();

var date = new Date();



  router.get('/chat', (req, res) => {
    models.messages.findAll()
      .then((posts) => {
        res. render('posts', { posts });
      })
    });



  router.post('/chat', (req, res) => {
    models.messages.create({
      //userId: req.body.post,
      post: req.body.post
    })
    .then((post) => {
      res.redirect('/posts');
    })
    .catch((err) => {
      console.log('ERROR while creating a new post');
      res.redirect('/error');
    })
  });



router.get('/chat/:id', (req, res) => {
  models.messages.findAll({     where: {
        createdAt: {
            $gt: '2018-12-1 00:00:00',
            $lt: '2018-12-9 23:59:59'
        }
    } })
  .then(users => {
    res.json(users);
  });
});

module.exports = router;
