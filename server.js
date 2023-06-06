const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const session = require('express-session');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.get('/signin', (req, res) => {
  res.sendFile(__dirname + '/public/signin.html');
});

app.post('/signin', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log('Nom d\'utilisateur :', username);
  console.log('Mot de passe :', password);

  // Vérifier les informations de connexion
  if (checkCredentials(username, password)) {
    // Stocker les informations de connexion dans la session
    req.session.username = username;
    req.session.isLoggedIn = true;

    // Rediriger vers la page de succès de connexion
    res.redirect('/index.html');
  } else {
    // Rediriger vers la page d'échec de connexion
    res.redirect('/failure.html');
  }
});

// Route pour afficher le formulaire d'inscription
app.get('/signup', (req, res) => {
  // Vérifier si l'utilisateur est déjà connecté (par exemple, en vérifiant l'état de la session)
  if (isUserLoggedIn(req)) {
    // Rediriger vers la page d'index si l'utilisateur est déjà connecté
    res.redirect('/index.html');
  } else {
    // Afficher le formulaire d'inscription
    res.sendFile(__dirname + '/public/signup.html');
  }
});

// Route pour gérer la soumission du formulaire d'inscription
app.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const email = req.body.email;

  console.log('Nom d\'utilisateur :', username);
  console.log('Mot de passe :', password);
  console.log('Confirmer le mot de passe :', confirmPassword);
  console.log('Adresse e-mail :', email);

  // Vérifier si le mot de passe correspond à la confirmation
  if (password !== confirmPassword) {
    res.send("Le mot de passe ne correspond pas à la confirmation.");
    return;
  }

  // Vérifier si l'username existe déjà dans data.json
  if (checkUsernameExists(username)) {
    res.send("Ce pseudo est déjà pris.");
    return;
  }

  // Créer un objet contenant les données d'inscription
  const userData = {
    username: username,
    password: password,
    email: email
  };

  saveUserData(userData);
  res.redirect('/index.html');
});

// Route pour la déconnexion
app.get('/logout', (req, res) => {
  // Supprimer les informations de session
  req.session.destroy(err => {
    if (err) {
      console.error('Erreur lors de la destruction de la session :', err);
    } else {
      console.log('Déconnexion réussie.');
    }

    // Rediriger vers la page d'index après la déconnexion réussie
    res.redirect('/index.html');
  });
});



app.use(express.static(__dirname + '/public'));
app.listen(port, () => {
  console.log(`Serveur Express.js en cours d'exécution sur le port ${port}`);
});

// Fonction pour vérifier les informations de connexion
function checkCredentials(username, password) {
  // Lire le contenu du fichier JSON
  const jsonData = fs.readFileSync('data.json', 'utf8');
  const users = JSON.parse(jsonData);

  // Rechercher l'utilisateur dans la liste
  const user = users.find(user => user.username === username && user.password === password);

  // Retourner true si l'utilisateur est trouvé, sinon false
  return user !== undefined;
}

// Fonction pour vérifier si l'username existe déjà dans data.json
function checkUsernameExists(username) {
  // Lire le contenu du fichier JSON
  const jsonData = fs.readFileSync('data.json', 'utf8');
  const users = JSON.parse(jsonData);

  // Rechercher l'utilisateur dans la liste
  const user = users.find(user => user.username === username);

  // Retourner true si l'utilisateur est trouvé, sinon false
  return user !== undefined;
}

// Fonction pour sauvegarder les données d'inscription dans un fichier JSON
function saveUserData(userData) {
  // Lire le contenu du fichier JSON existant (s'il existe)
  let jsonData = [];
  if (fs.existsSync('data.json')) {
    const existingData = fs.readFileSync('data.json', 'utf8');
    jsonData = JSON.parse(existingData);
  }

  // Ajouter les nouvelles données d'inscription à la liste
  jsonData.push(userData);

  fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2));
}

function isUserLoggedIn(req) {
  return req.session && req.session.isLoggedIn === true;
}
