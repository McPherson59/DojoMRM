const configuration = require('./mrm-configuration.json');

export class MrmClientService {
  getBodyTrajet(carburant, typeVehicule, distance, trajets) {
    const body =
      '{"vehicule":{ "carburant":"' +
      carburant.toUpperCase() +
      '", "type":"' +
      typeVehicule +
      '", "kilometres":' +
      distance +
      ', "trajets":' +
      trajets +
      ' } }';

    return body;
  }

  getTrajetsSimples(typeTrajet) {
    return '[{"type":"' + typeTrajet.toUpperCase() + '","pourcentage":100}]';
  }

  getTrajetsMixtes(typeTrajet, distanceNumber, typeTrajet2, distanceNumber2) {
    const trajets =
      '[{"type":"' +
      typeTrajet.toUpperCase() +
      '","pourcentage":' +
      this.getPourcentage(distanceNumber, distanceNumber2) +
      '},{"type":"' +
      typeTrajet2.toUpperCase() +
      '","pourcentage":' +
      this.getPourcentage(distanceNumber2, distanceNumber) +
      '}]';

    return trajets;
  }

  getBodyComparaisonVoiture(carburant, consommation) {
    const body =
      '{"vehicule":{ "carburant":"' +
      carburant.toUpperCase() +
      '", "consommation":' +
      consommation +
      ' } }';

    return body;
  }

  getBodyComparaison(emission, item) {
    const body =
      '{"emissionEnergetique":{"emission":' +
      emission +
      ',"energie":null},"item" : {"nom":"' +
      item +
      '"}}';
    return body;
  }

  getUrl(apiName) {
    var uri;
    switch (apiName) {
      case 'apiConsommationVoiture':
        uri = configuration.apiConsommationVoiture;
        break;
      case 'apiTrajetSimple':
        uri = configuration.apiTrajetSimple;
        break;
      case 'apiTrajetMixte':
        uri = configuration.apiTrajetMixte;
        break;
      case 'apiComparaison':
        uri = configuration.apiComparaison;
        break;
    }

    const url = configuration.url + uri;
    return url;
  }

  calculRound(unit) {
    return Math.round(unit * 100) / 100;
  }

  calculPourcentage(unit) {
    return Math.round(unit * 10000) / 100;
  }

  getPourcentage = (dist1, dist2) => {
    return Math.round((dist1 / (dist1 + dist2)) * 100) / 1;
  };
}
