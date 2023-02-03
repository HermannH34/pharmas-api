## Pharmas API

API pour une application web simplifiant la vie des Pharmacies dans la prise de commande de médicaments auprès des laboratoires et tout ce qui est lié à la vente.

Les pharmacies sont localisées par ville et elles sont souvent plusieurs par ville.

### Base URL

L'url de l'API est https://pharmas-api.herokuapp.com/


#### Endpoints

* La liste des laboratoires  `GET '/laboratories'`

* La liste des pharmacies avec un filtre par ville possible GET `'/pharmacies/:city'`

 Pour exemple le JSON de toutes les pharmacies de :London
```json
["Flatley - Pfeffer","Johns, Ziemann and Marquardt","Crist LLC","DuBuque - Ankunding","Goyette, Kihn and Toy"]
```
