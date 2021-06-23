import characteristics from '../../Data/characteristics.json';

export class EmissionService {
  calculEmissionConsommationVoiture(co2ParUnite, nbUnites) {
    const emission = co2ParUnite * nbUnites;
    return Math.round(emission * 100) / 100;
  }

  calculEnergie(energieParUnite, nbUnites) {
    const energie = energieParUnite * nbUnites;
    return Math.round(energie * 100) / 100;
  }

  getConsommationTrajet(distance, consommation) {
    const consommationTrajet =
      Math.round(distance * consommation * 100) / 10000;
    return consommationTrajet;
  }

  getComparaison(element1, element2) {
    const comparaison = Math.round((element1 / element2) * 10000) / 100;
    return comparaison;
  }
}
