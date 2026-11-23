# Bibliogeek
bibliothèque numérique qui répertorie des jeux vidéos

config a installé 
npm install express
npm install drizzle-orm @libsql/client dotenv
npm install --save-dev drizzle-kit
npm install hbs

## Lancer le projet

```
npm install
copier .env.example en .env (si besoin)
npm run db:push   # crée les tables dans data/bibliogeek.db
npm run seed      # ajoute des données de test
npm run dev       # http://localhost:3000
```

## Arborescence

```
Bibliogeek/
├── index.js              # point d'entrée : serveur Express
├── drizzle.config.js     # config Drizzle Kit
├── .env / .env.example   # variables d'environnement
├── data/                 # base SQLite (non versionnée)
├── drizzle/              # migrations générées
├── src/
│   ├── db/
│   │   ├── index.js      # connexion à la base
│   │   ├── schema.js     # tables (jeux, editeurs, tags, utilisateurs + liaisons)
│   │   └── seed.js       # données de départ
│   └── routes/
│       ├── accueil.js    # page d'accueil
│       ├── jeux.js       # F1 à F5
│       └── editeurs.js   # F6 à F10
├── views/                # templates Handlebars
│   ├── layout.hbs
│   ├── accueil.hbs, 404.hbs
│   ├── partials/         # header, footer, carte-jeu
│   ├── jeux/             # liste, detail, formulaire
│   └── editeurs/         # liste, detail, formulaire
└── public/               # fichiers statiques
    ├── css/style.css
    ├── js/main.js
    └── images/           # jeux, editeurs, utilisateurs
```
