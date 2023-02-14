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

---------------
### :hammer_and_wrench: Installation

* Cloner ce projet depuis GitHub.
* Ouvrir le terminal sur ce dossier et exécuter npm install pour installer les dépendances.
* Démarrer ` npm run dev ` pour avoir accès au serveur de développement.
* Rendez-vous sur  `http://localhost:8000 `.

---------------
### :man_technologist: Utilisé dans ce projet

| Technologies | et outils |
|:--------------|:-------------:|
| Langage: JavaScript | Git/GitHub |
| Serveur: Node.js | Visual Studio Code |
| Framework: Fastify | xXx |
| DB: SQLite | xXx |
| Tests: Tap | xXx |
