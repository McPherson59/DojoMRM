import { EmissionService } from './emission-service';

describe('Emission service', () => {
  const emissionService = new EmissionService();

  describe('calculEmissionConsommationVoiture', () => {
    it('should return zero when nbunites is zero', () => {
      // given
      const co2ParUnite = 123;
      const nbUnites = 0;

      // when
      const emission = emissionService.calculEmissionConsommationVoiture(
        co2ParUnite,
        nbUnites
      );

      // then
      expect(emission).toEqual(0);
    });

    it('should return 282,9 when 123 unit of 2,3 kg CO² per unit', () => {
      // given
      const co2ParUnite = 123;
      const nbUnites = 2.3;

      // when
      const emission = emissionService.calculEmissionConsommationVoiture(
        co2ParUnite,
        nbUnites
      );

      // then
      expect(emission).toEqual(282.9);
    });
  });

  describe('calculEnergie', () => {
    it('should return zero when energie Par Unite is zero', () => {
      // given
      const energieParUnite = 0;
      const nbUnites = 123;

      // when
      const energie = emissionService.calculEnergie(energieParUnite, nbUnites);

      // then
      expect(energie).toEqual(0);
    });

    it('should return 282,9 when 123 unit of 9.63 kWh per unit', () => {
      // given
      const co2ParUnite = 123;
      const nbUnites = 9.63;

      // when
      const emission = emissionService.calculEnergie(co2ParUnite, nbUnites);

      // then
      expect(emission).toEqual(1184.49);
    });
  });
});
