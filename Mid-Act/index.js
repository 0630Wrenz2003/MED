const express = require('express');
const app = express();

//Uploads
app.use(express.static('public'));

const path = require('path');
const mime = require('mime-types');
const multer = require('multer');

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorage });

app.post('/uploads', upload.single('myFile'), (req, res) => {
  console.log(req.file);

  req.file.mimetype = mime.lookup(req.file.originalname);

  res.sendFile(path.join(__dirname, 'file-uploaded.html'));
});

app.get('/file-upload', (req, res) => {
  res.sendFile(__dirname + '/' + 'file-upload.html');
});

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/' + 'index.html');
});

//get form
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/' + 'contact.html');
});

app.get('/process_get', function (req, res) {
  // Prepare output in JSON format
  response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
  };

  console.log(response);
  res.end(JSON.stringify(response));
});

//app listen server
app.listen(3000, function () {
  console.log('Server is running on port 3000');
});
