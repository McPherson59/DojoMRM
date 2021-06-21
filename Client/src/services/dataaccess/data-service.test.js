import { DataService } from './data-service';

describe('Data service', () => {
  const dataService = new DataService();

  describe('getCarburantData', () => {
    it('should return undefined when Carburant label is unknown', () => {
      // given
      const carburantLabel = 'nitro';

      // when
      const carburantData = dataService.getCarburantData(carburantLabel);

      // then
      expect(carburantData).toBeUndefined();
    });

    it('should return Carburant data when Carburant label is known', () => {
      // given
      const carburantLabel = 'Gasoil';

      // when
      const carburantData = dataService.getCarburantData(carburantLabel);

      // then
      expect(carburantData).toEqual({
        carburant: 'Gasoil',
        emissionKgCO2ParUnite: 2.67,
        energiekWh: 10.74,
        unite: 'l',
      });
    });
  });
});
