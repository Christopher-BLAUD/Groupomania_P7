const express = require('express');
const app = express();

// Routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/like')

// Sequelize
const sequelize = require('./utils/database');

// Models
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');
const Like = require('./models/like')

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

/* sequelize.sync({force: true}) */
/* sequelize.sync({alter: true}) */

// Définition des relations

User.hasMany(Post);

Post.belongsTo(User, {
  onDelete: 'CASCADE'
});

Post.hasMany(Comment);

Comment.belongsTo(User,
{
  onDelete: 'CASCADE'
}
);

Comment.belongsTo(Post, {
  onDelete: 'CASCADE'
});

Like.belongsTo(User, 
{
  onDelete: 'CASCADE'
}
);

Post.hasMany(Like);

Like.belongsTo(Post, {
  onDelete: 'CASCADE'
});




app.use('/api/user/images', express.static(path.join(__dirname, 'images')));
app.use('/api/post/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/like', likeRoutes)
app.use('/api/comment', commentRoutes)



module.exports = app;