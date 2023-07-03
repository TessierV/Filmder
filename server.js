const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

/*** Route for displaying the sign-in page ***/
app.get('/signin', (req, res) => {
  if (isUserLoggedIn(req)) {
    res.redirect('/filmdeur.html');
  } else {
    res.sendFile(__dirname + '/public/signin.html');
  }
});

/*** Route for handling sign-in form submission ***/
app.post('/signin', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log('Username:', username);
  console.log('Password:', password);

  if (checkCredentials(username, password)) {
    req.session.username = username;
    req.session.isLoggedIn = true;
    res.redirect('/filmdeur.html');
  } else {
    res.redirect('/index.html');
  }
});

/*** Route for displaying the sign-up page ***/
app.get('/signup', (req, res) => {
  if (isUserLoggedIn(req)) {
    res.redirect('/filmdeur.html');
  } else {
    res.sendFile(__dirname + '/public/signup.html');
  }
});

/*** Set up multer storage for file uploads ***/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage });

/*** Route for handling sign-up form submission with file upload ***/
app.post('/signup', upload.single('photo'), (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const email = req.body.email;

  console.log('Username:', username);
  console.log('Password:', password);
  console.log('Confirm Password:', confirmPassword);

  if (password !== confirmPassword) {
    res.send("The password does not match the confirmation.");
    return;
  }

  if (checkUsernameExists(username)) {
    res.send("This username is already taken.");
    return;
  }

  const userData = {
    username: username,
    password: password,
  };

  saveUserData(userData);
  res.redirect('/filmdeur.html');
});

/*** Route for handling user logout ***/
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
    } else {
      console.log('Logout successful.');
    }
    res.redirect('/index.html');
  });
});

/*** Serve static files from the 'public' directory ***/
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`Express.js server running on port ${port}`);
});

/*** Function to check user credentials ***/
function checkCredentials(username, password) {
  const jsonData = fs.readFileSync('data.json', 'utf8');
  const users = JSON.parse(jsonData);
  const user = users.find(user => user.username === username && user.password === password);
  return user !== undefined;
}

/*** Function to check if a username already exists ***/
function checkUsernameExists(username) {
  const jsonData = fs.readFileSync('data.json', 'utf8');
  const users = JSON.parse(jsonData);
  const user = users.find(user => user.username === username);
  return user !== undefined;
}

/*** Function to save user data to JSON file ***/
function saveUserData(userData) {
  let jsonData = [];
  if (fs.existsSync('data.json')) {
    const existingData = fs.readFileSync('data.json', 'utf8');
    jsonData = JSON.parse(existingData);
  }
  jsonData.push(userData);
  fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2));
}

/*** Function to check if a user is logged in ***/
function isUserLoggedIn(req) {
  return req.session && req.session.isLoggedIn === true;
}


/*** Route for serving the index.html file ***/
app.get('/index.html', (req, res) => {
  const filePath = __dirname + '/public/index.html';

  /*** Read the content of the file ***/
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Error reading file.');
    }

    /*** Check if the user is logged in ***/
    if (isUserLoggedIn(req)) {
      const username = req.session.username || '';
      const userPhoto = req.session.photo || '';

      /*** Modify the img tag with id "user-photo" ***/
      const modifiedData = data.replace('<img id="user-photo" src="" alt="Profile Photo">', '<img id="user-photo" src="' + userPhoto + '" alt="Profile Photo">');

      /*** Send the modified file to the client ***/
      res.send(modifiedData);
    } else {
      /*** Send the file as it is to the client ***/
      res.send(data);
    }
  });
});


/*** Route for getting user data as JSON ***/
app.get('/user', (req, res) => {
  if (isUserLoggedIn(req)) {
    const username = req.session.username || '';
    const photo = req.session.photo || '';

    /*** Send the user data as JSON response ***/
    res.json({ username: username, photo: photo });
  } else {
    res.status(401).send('User not logged in.');
  }
});

/*app.get('/user-photo', (req, res) => {
  if (isUserLoggedIn(req)) {
    const photoPath = req.session.photo;
    if (photoPath) {
      const filePath = __dirname + '/' + photoPath;
      res.sendFile(filePath);
    } else {
      res.status(404).send('Aucune photo de profil trouvée.');
    }
  } else {
    res.status(401).send('Utilisateur non connecté.');
  }
});*/
