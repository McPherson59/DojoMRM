import React, { useState, useEffect } from 'react';
import { Table, Text, Button, SelectBase } from '@axa-fr/react-toolkit-all';
import { DataService } from '../../services/dataaccess/data-service';
import { EmissionService } from '../../services/calc/emission-service';
import './ConsommationVoiture.scss';

export const ConsommationVoiture = () => {
  const [consommationNumber, setConsommationNumber] = useState(0);
  const [typeCarburant, setTypeCarburant] = useState('');
  const [uniteCarburant, setUniteCarburant] = useState('L ou kWh');

  const [hasResults, setHasResults] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const carburantsData = new DataService();
  const emissionService = new EmissionService();

  const [emissionResultat, setEmissionResultat] = useState(0);
  const [energieResultat, setEnergieResultat] = useState(0);

  const getCarburantOptions = () => {
    return carburantsData.getCarburantsListe();
  };

  const calculHandler = () => {
    const data = carburantsData.getCarburantData(typeCarburant);
    const emissionParUnite = data.emissionKgCO2ParUnite;
    const energieParUnite = data.energiekWh;

    setEmissionResultat(
      emissionService.calculEmissionConsommationVoiture(
        emissionParUnite,
        consommationNumber
      )
    );

    setEnergieResultat(
      emissionService.calculEnergie(energieParUnite, consommationNumber)
    );

    setHasResults(true);
  };

  /*const setChangeCarburant = value => {
    console.log('value');
    console.log(value);
    console.log('typeCarburant');
    console.log(typeCarburant);

    const data = carburantsData.getCarburantData(typeCarburant);
    const unite = data.unite;

    console.log('unite');
    console.log(unite);

    setUniteCarburant(carburantsData.getCarburantData(typeCarburant).unite);
    if (consommationNumber > 0) {
      calculHandler();
    }
  };*/

  useEffect(() => {
    setHasResults(false);
    if (consommationNumber > 0 && typeCarburant !== '') {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [typeCarburant, consommationNumber]);

  const classNameBtn = isDisabled
    ? 'hasiconLeft calculate disabled'
    : 'hasiconLeft calculate';
  return (
    <>
      <div className="container container-body">
        <p className="af-body--content">
          Calculez les émissions de Gaz à effet de Serre dues à vos trajets.
          <br></br> En tant qu'automobiliste, vous pouvez choisir:
        </p>
        <ul>
          <li>le type de carburant,</li>
          <li>la quantité consommée.</li>
        </ul>
        <p>
          -> Le calculateur renverra le nombre de kg de CO² émis ainsi que
          l'énergie en kWh que cela représente.
        </p>
        <Table className="af-table">
          <Table.Header>
            <Table.Tr>
              <Table.Th>Description</Table.Th>
              <Table.Th>Inputs</Table.Th>
              <Table.Th>Résultats</Table.Th>
            </Table.Tr>
          </Table.Header>

          <Table.Body>
            <Table.Tr>
              <Table.Td width="300px">Type de Carburant :</Table.Td>
              <Table.Td width="300px">
                <SelectBase
                  name="typeCarburant"
                  id="typeCarburant"
                  onChange={({ value }) => setTypeCarburant(value)}
                  options={getCarburantOptions()}
                  value={typeCarburant}
                  placeholder="- Select -"
                  forceDisplayPlaceholder="false"
                  forceDisplayMessage="false"
                  message=""
                  helpMessage=""
                />
              </Table.Td>
              <Table.Td width="300px">
                {hasResults && (
                  <div>
                    Emission : <b>{emissionResultat} kg de CO²</b>
                  </div>
                )}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Consommation (en {uniteCarburant}) :</Table.Td>
              <Table.Td>
                <Text
                  id="consommation"
                  name="consommation"
                  value={consommationNumber}
                  onChange={({ value }) =>
                    setConsommationNumber(parseFloat(value) || '0')
                  }
                />
              </Table.Td>
              <Table.Td>
                {hasResults && (
                  <div>
                    Energie : <b>{energieResultat} kWh</b>
                  </div>
                )}
              </Table.Td>
            </Table.Tr>
          </Table.Body>
        </Table>
        <div className="container-center">
          <Button
            disabled={isDisabled}
            classModifier={classNameBtn}
            id="validation-button"
            onClick={calculHandler}>
            <span className="af-btn__text"> Calculer </span>
            <i className="glyphicon glyphicon-stats" />
          </Button>
        </div>
      </div>
    </>
  );
};
