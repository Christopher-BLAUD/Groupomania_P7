const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const sequelize = require('./utils/database');
const User = require('./models/user');
const Post = require('./models/post');
const bodyParser = require('body-parser');
const path = require('path');
const { hasUncaughtExceptionCaptureCallback } = require('process');




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true}));

/* User.belongsToMany(Post, { through: 'users_posts'});
Post.belongsToMany(User, { through: 'users_posts'}); */
/* User.hasMany(Post); */

User.hasMany(Post);
Post.belongsTo(User);

sequelize
  .sync()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  })

app.use('/api/user/images', express.static(path.join(__dirname, 'images')));
app.use('/api/post/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);



module.exports = app;