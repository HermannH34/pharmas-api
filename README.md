## V1 d'une API REST pour une application web/mobile simplifiant la vie des Pharmacies et laboratoires

### Contexte du projet

Le but de l'application est de simplifier la vie des pharmaciens et laboratoires sur tout ce qui est administratif dans la vente de médicaments des pharmacies et la prise de commande auprès des laboratoires.

L'application a donc comme clients des pharmacies et des laboratoires.

Les laboratoires communiquent une liste de produits, et nous avons également accès aux commandes de leur pharmacies clientes.

De plus, ces pharmacies sont également clientes de l'application et nous avons donc accès à leur ventes lignes par lignes.

Les pharmacies sont localisées par ville et elles sont souvent plusieurs par ville.

#### Endpoints

* La liste des pharmacies.

* La liste des laboratoires avec un filtre par ville possible.

* 2 endpoints de création, une pour une prise de commande (entre une pharmacie et un laboratoire) et une pour une vente (de la pharmacie).

### API Documentation

| Route | query | body | Description |
|:--------------|:-------------|:--------------|:-------------:|
| POST /api/register |  | `:name`  `:email`  `:password` `:ispharmacy` | Se créer un compte pharmacie ou laboratoire |
| POST /api/login |  | `:email`  `:password` | Se connecter |
| POST /api/pharmacy/new |  | `:name`  `:city` | Créer une pharmacie |
| POST /api/laboratory/new |  | `:name` | Créer un laboratoire |
| GET /api/laboratory | |  |Liste des laboratoires |
| GET /api/pharmacy | | | Liste des pharmacies |
| POST /api/pharmacy | `:city` | | Liste des pharmacies par ville |
| POST /api/order |  | `:product`  `:quantity`  `:laboratory` | Commande d'un médicament par une pharmacie auprès d'un labo, ex: `{"DataReceived": " 7 Smecta from Servier"}`  |
| POST /api/sale |  | `:product` | Vente d'un médicament par une pharmacie |


---------------
### :hammer_and_wrench: Installation

* Cloner ce projet depuis GitHub.
* Ouvrir le terminal sur ce dossier et exécuter ` npm install ` pour installer les dépendances.
* Exécuter ` src/seeds.js ` pour remplir la database de fausses données.
* Démarrer ` npm run dev ` pour avoir accès au serveur de développement.
* Rendez-vous sur  `http://localhost:8000 `

---------------
### :man_technologist: Utilisé dans ce projet

| Technologies | et outils |
|:--------------|:-------------:|
| Langage: JavaScript | Git/GitHub |
| Serveur: Node.js | Visual Studio Code |
| Framework: Express | Postman |
| DB: SQLite | xXx |
