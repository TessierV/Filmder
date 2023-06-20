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


app.get('/signin', (req, res) => {
  if (isUserLoggedIn(req)) {
    res.redirect('/filmdeur.html');
  } else {
    res.sendFile(__dirname + '/public/signin.html');
  }
});

app.post('/signin', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log('Nom d\'utilisateur :', username);
  console.log('Mot de passe :', password);

  if (checkCredentials(username, password)) {
    req.session.username = username;
    req.session.isLoggedIn = true;
    res.redirect('/filmdeur.html');
  } else {
    res.redirect('/index.html');
  }
});

app.get('/signup', (req, res) => {
  if (isUserLoggedIn(req)) {
    res.redirect('/filmdeur.html');
  } else {
    res.sendFile(__dirname + '/public/signup.html');
  }
});

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

app.post('/signup', upload.single('photo'), (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const email = req.body.email;

  console.log('Nom d\'utilisateur :', username);
  console.log('Mot de passe :', password);
  console.log('Confirmer le mot de passe :', confirmPassword);

  if (password !== confirmPassword) {
    res.send("Le mot de passe ne correspond pas à la confirmation.");
    return;
  }

  if (checkUsernameExists(username)) {
    res.send("Ce pseudo est déjà pris.");
    return;
  }
  const userData = {
    username: username,
    password: password,

  };
  saveUserData(userData);
  res.redirect('/filmdeur.html');
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Erreur lors de la destruction de la session :', err);
    } else {
      console.log('Déconnexion réussie.');
    }
    res.redirect('/index.html');
  });
});

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`Serveur Express.js en cours d'exécution sur le port ${port}`);
});

function checkCredentials(username, password) {
  const jsonData = fs.readFileSync('data.json', 'utf8');
  const users = JSON.parse(jsonData);
  const user = users.find(user => user.username === username && user.password === password);
  return user !== undefined;
}

function checkUsernameExists(username) {
  const jsonData = fs.readFileSync('data.json', 'utf8');
  const users = JSON.parse(jsonData);
  const user = users.find(user => user.username === username);
  return user !== undefined;
}

function saveUserData(userData) {
  let jsonData = [];
  if (fs.existsSync('data.json')) {
    const existingData = fs.readFileSync('data.json', 'utf8');
    jsonData = JSON.parse(existingData);
  }
  jsonData.push(userData);
  fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2));
}

function isUserLoggedIn(req) {
  return req.session && req.session.isLoggedIn === true;
}

app.get('/index.html', (req, res) => {
  const filePath = __dirname + '/public/index.html';

  // Lire le contenu du fichier
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier :', err);
      return res.status(500).send('Erreur de lecture du fichier.');
    }

    // Vérifier si l'utilisateur est connecté
    if (isUserLoggedIn(req)) {
      const username = req.session.username || '';
      const userPhoto = req.session.photo || '';

      // Modifier la balise img avec l'id "user-photo"
      const modifiedData = data.replace('<img id="user-photo" src="" alt="Photo de profil">', '<img id="user-photo" src="' + userPhoto + '" alt="Photo de profil">');

      // Envoyer le fichier modifié au client
      res.send(modifiedData);
    } else {
      // Envoyer le fichier non modifié au client
      res.send(data);
    }
  });
});

app.get('/user', (req, res) => {
  if (isUserLoggedIn(req)) {
    const username = req.session.username || '';
    const photo = req.session.photo || '';

    // Renvoyer les données de l'utilisateur en tant que réponse JSON
    res.json({ username: username, photo: photo });
  } else {
    res.status(401).send('Utilisateur non connecté.');
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

