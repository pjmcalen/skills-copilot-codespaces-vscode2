// Create web server
// 1. Import express
const express = require('express');
const app = express();
// 2. Import body-parser
const bodyParser = require('body-parser');
// 3. Import mongoose
const mongoose = require('mongoose');
// 4. Import Comment model
const Comment = require('./comment');
// 5. Connect to the database
mongoose.connect('mongodb://localhost/comments');
// 6. Use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// 7. Create a new comment
app.post('/comments', (req, res) => {
  const comment = new Comment(req.body);
  comment.save((err, comment) => {
    if (err) res.send(err);
    res.json(comment);
  });
});
// 8. Get all comments
app.get('/comments', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) res.send(err);
    res.json(comments);
  });
});
// 9. Get a comment by id
app.get('/comments/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) res.send(err);
    res.json(comment);
  });
});
// 10. Update a comment
app.put('/comments/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, req.body, (err, comment) => {
    if (err) res.send(err);
    res.json(comment);
  });
});
// 11. Delete a comment
app.delete('/comments/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id, (err, comment) => {
    if (err) res.send(err);
    res.json(comment);
  });
});
// 12. Listen on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
// 13. Export app
module.exports = app;

// Path: comment.js
// 1. Import mongoose
const mongoose = require('mongoose');
// 2. Create a schema
const commentSchema = new mongoose.Schema({
