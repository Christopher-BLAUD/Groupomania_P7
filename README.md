
![Logo](https://repository-images.githubusercontent.com/389939523/ba474fa1-9c0a-4064-b83f-c655b6bdf4e9)


Cette application web est un réseau social d'entreprise dédié aux salariés de Groupomania.


# *Installation*
Cloner ce repo sur votre machine.  
Pour lancer l'application, veuillez suivre les instructions ci-dessous

## __Frontend__

- Ouvrez un terminal et placez vous dans le répertoire __"frontend"__ du projet.

Exécutez les commandes suivantes :

```bash
  npm install
```
et 

```bash
  npm run serve
```

La console devrait vous afficher un message comme ceci :

```bash
  App running at:
  - Local:  http://localhost:8080/
  - Network: http://192.168.1.100:8080/
```

## __Backend__

- Ouvrez une autre terminal et placez vous dans le répertoire __"backend"__

Exécutez les commandes suivantes :

```bash
npm install
```

et 

```bash
nodemon server
```

La console devrait vous afficher un message comme ceci :

```bash
  [nodemon] restaring due to changes...
  [nodemon] starting 'node server.js'
  Listening on port 3000
```

- Ouvrez le fichier __".env"__

et renseignez les variables suivantes :

```bash
TOKEN_SECRET=""
DB_USER=""
DB_PASSWORD=""
```
__TOKEN_SECRET__ pour la valeur de votre choix.  
__DB_USER__ par le nom d'utilisateur de votre SGBD.  
__DB_PASSWORD__ par le mot de passe de votre SGBD.


## __Base de données__

Connectez-vous à mysql  
Créer une BDD nommée "groupomania".  
En cas de doute sur la syntaxe, référez-vous au site [sql.sh](https://sql.sh/cours/create-database)

## *Accéder à l'application*

- Ouvrez votre navigateur et tapez l'URL suivante: __http://localhost:8080/__

- Cliquez sur l'onglet "__Inscription__"  
Créer un nouveau compte utilisateur et renseignez ensuite l'adresse email choisi ainsi que le mot de passe dans l'onglet "__Connexion__"

Vous avez maintenant accès à l'application !  
Vous avez la possibilité de créer un publication contenant du texte et une image ou alors simplement un message.  
Il ne vous reste plus qu'à télécharger une photo de profil et commencez à l'utiliser.