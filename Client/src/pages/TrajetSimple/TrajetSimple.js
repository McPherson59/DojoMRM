import React, { useState, useEffect } from 'react';
import { Table, Number, Button, Select } from '@axa-fr/react-toolkit-all';
import { DataService } from '../../services/dataaccess/data-service';
import { EmissionService } from '../../services/calc/emission-service';
import './TrajetSimple.scss';

export const TrajetSimple = () => {
  const [distanceNumber, setDistanceNumber] = useState(0);
  const [typeCarburant, setTypeCarburant] = useState('');
  const [typeVehicule, setTypeVehicule] = useState('');
  const [typeTrajet, setTypeTrajet] = useState('');

  const [hasResults, setHasResults] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const Data = new DataService();
  const emissionService = new EmissionService();

  const [emissionResultat, setEmissionResultat] = useState(0);
  const [energieResultat, setEnergieResultat] = useState(0);

  const getCarburantOptions = () => {
    return Data.getCarburantsListe();
  };

  const getTrajetOptions = () => {
    return Data.getTrajetsListe();
  };

  const getTypeVehiculeOptions = () => {
    return Data.getTypeVehiculesListe();
  };

  const calculHandler = () => {
    const dataTrajet = Data.getconsommationTrajetPArTypeVehiculeData(
      Data.getCarburantSimple(typeCarburant),
      typeVehicule,
      typeTrajet
    );
    const dataCarburant = Data.getCarburantData(typeCarburant);
    const emissionParUnite = dataCarburant.emissionKgCO2ParUnite;
    const energieParUnite = dataCarburant.energiekWh;

    const dataConsommation = emissionService.getConsommationTrajet(
      distanceNumber,
      dataTrajet.consommation
    );

    setEmissionResultat(
      emissionService.calculEmissionConsommationVoiture(
        emissionParUnite,
        dataConsommation
      )
    );

    setEnergieResultat(
      emissionService.calculEnergie(energieParUnite, dataConsommation)
    );

    setHasResults(true);
  };

  useEffect(() => {
    setHasResults(false);
    if (
      distanceNumber > 0 &&
      typeCarburant !== '' &&
      typeVehicule !== '' &&
      typeTrajet !== ''
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [typeCarburant, distanceNumber, typeVehicule, typeTrajet]);

  const classNameBtn = isDisabled
    ? 'hasiconLeft calculate disabled'
    : 'hasiconLeft calculate';
  return (
    <>
      <div className="container container-body">
        <p className="af-body--content">
          Calculez les émissions de Gaz à effet de Serre dues à vos trajets.
          <br></br> En tant qu'automobiliste, vous pouvez choisir:
          <ul>
            <li>le type de carburant,</li>
            <li>la taille de voiture,</li>
            <li>le type de trajet,</li>
            <li>le nombre de km parcourus.</li>
          </ul>
          -> Le calculateur renverra le nombre de kg de CO² émis ainsi que
          l'énergie en kWh que cela représente.
        </p>
        <Table className="af-table">
          <Table.Header>
            <Table.Tr>
              <Table.Th>Type de Carburant</Table.Th>
              <Table.Th>Taille de la Voiture</Table.Th>
              <Table.Th>Type de Trajet</Table.Th>
              <Table.Th>Distance (en km)</Table.Th>
              <Table.Th>Résultats</Table.Th>
            </Table.Tr>
          </Table.Header>
          <Table.Body>
            <Table.Tr>
              <Table.Td>
                <Select
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
              <Table.Td>
                <Select
                  name="typeVehicule"
                  id="typeVehicule"
                  onChange={({ value }) => setTypeVehicule(value)}
                  options={getTypeVehiculeOptions()}
                  value={typeVehicule}
                  placeholder="- Select -"
                  forceDisplayPlaceholder="false"
                  forceDisplayMessage="false"
                  message=""
                  helpMessage=""
                />
              </Table.Td>
              <Table.Td>
                <Select
                  name="typeTrajet"
                  id="typeTrajet"
                  onChange={({ value }) => setTypeTrajet(value)}
                  options={getTrajetOptions()}
                  value={typeTrajet}
                  placeholder="- Select -"
                  forceDisplayPlaceholder="false"
                  forceDisplayMessage="false"
                  message=""
                  helpMessage=""
                />
              </Table.Td>
              <Table.Td>
                <Number
                  id="distance"
                  name="distance"
                  value={distanceNumber}
                  type="number"
                  step="0.1"
                  onChange={({ value }) => {
                    setDistanceNumber(value);
                  }}
                />
              </Table.Td>
              <Table.Td>
                {hasResults && (
                  <div>
                    Emission : <b>{emissionResultat} kg de CO²</b>
                  </div>
                )}
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
