## Pharmas API

API pour une application web simplifiant la vie des Pharmacies et laboratoires dans la prise de commande de médicaments auprès des laboratoires et tout ce qui est lié à la vente.

Les pharmacies sont localisées par ville et elles sont souvent plusieurs par ville.

Les laboratoires communiquent une liste de produits, et nous avons également accès aux commandes de leur pharmacies clientes.

### Base URL

L'url de l'API est https://pharmas-api.herokuapp.com/


#### Endpoints

* La liste des pharmacies  `GET '/pharmacies'`

* La liste des laboratoires  `GET '/laboratories'`

* Un laboratoire peut produire un médicament  `PUT '/laboratory/:id'`
`params:
:product
`

* La liste des pharmacies avec un filtre par ville possible GET `'/pharmacies/:city'`

 Pour exemple, le fichier JSON de toutes les pharmacies de `:London`
```json
["Flatley - Pfeffer","Johns, Ziemann and Marquardt","Crist LLC","DuBuque - Ankunding","Goyette, Kihn and Toy"]
```
* Une pharmacie peut commander un médicament auprès d'un laboratoire  `PUT '/pharmacy/:id'`
`params:
:title
:product
:laboratory
`
