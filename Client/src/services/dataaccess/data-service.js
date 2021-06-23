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

  getTrajetsListe() {
    return characteristics.trajetsListe;
  }

  getComparaisonDomaineListe() {
    return characteristics.comparaisonDomaine;
  }

  getTypeVehiculesListe() {
    const rawTypeVehicules = characteristics.typeVehicules;

    const transformedTypeVehicules = rawTypeVehicules.map(obj => {
      return {
        value: obj.segment,
        label: obj.type,
      };
    });

    return transformedTypeVehicules;
  }

  getconsommationTrajetPArTypeVehiculeData(
    carburant,
    typeVehicule,
    typeTrajet
  ) {
    return characteristics.consommationTrajetPArTypeVehicule.find(
      characteristic =>
        characteristic.carburant === carburant &&
        characteristic.trajet === typeTrajet &&
        characteristic.segment === typeVehicule
    );
  }

  getCarburantSimple(carburantLabel) {
    const CarburantSimple = carburantLabel;

    if (carburantLabel.includes('Ethanol')) {
      return 'Ethanol';
    }

    if (carburantLabel.includes('Electrique')) {
      return 'Ethanol';
    }

    return CarburantSimple;
  }

  getComparaisonElementsListe(domaine) {
    const rawDomaine = characteristics.comparaisonEmissionCO2.filter(
      characteristic => characteristic.domaine === domaine
    );

    const transformedDomaine = rawDomaine.map(obj => {
      return {
        value: obj.item,
        label: obj.item,
      };
    });

    return transformedDomaine;
  }

  getComparaisonElements(item) {
    return characteristics.comparaisonEmissionCO2.find(
      characteristic => characteristic.item === item
    );
  }
}
