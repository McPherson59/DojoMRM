const characteristics = require('../../Data/characteristics.json');

export class DataService {
  getCarburantData(carburantLabel) {
    return characteristics.carburants.find(
      characteristic => characteristic.carburant === carburantLabel
    );
  }

  getCarburantsListe() {
    return characteristics.carburantsListe;
  }
}
