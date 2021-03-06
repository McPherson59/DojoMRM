import React, { useState, useEffect } from 'react';
import { Table, Number, Button, Select } from '@axa-fr/react-toolkit-all';
import { DataService } from '../../services/dataaccess/data-service';
import { MrmClientService } from '../../services/mrmclient/mrm-client';
import './ConsommationVoiture.scss';

export const ConsommationVoiture = () => {
  const [consommationNumber, setConsommationNumber] = useState(0);
  const [typeCarburant, setTypeCarburant] = useState('');
  const [uniteCarburant, setUniteCarburant] = useState('L ou kWh');

  const [hasResults, setHasResults] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const carburantsData = new DataService();
  const emissionService = new MrmClientService();

  const [emissionResultat, setEmissionResultat] = useState(0);
  const [energieResultat, setEnergieResultat] = useState(0);

  const getCarburantOptions = () => {
    return carburantsData.getCarburantsListe();
  };

  const setChangeCarburant = value => {
    const data = carburantsData.getCarburantData(value);
    setUniteCarburant(data.unite);
    setTypeCarburant(value);
  };

  const calculHandler = () => {
    performConnection(
      emissionService.getBodyComparaisonVoiture(
        typeCarburant,
        consommationNumber
      )
    );
  };

  const calculResultat = resultat => {
    setEmissionResultat(
      emissionService.calculRound(resultat.emissionEnergetique.emission)
    );
    setEnergieResultat(
      emissionService.calculRound(resultat.emissionEnergetique.energie)
    );
    setHasError(false);
    setHasResults(true);
  };

  const calculError = () => {
    setHasError(true);
    setHasResults(false);
  };

  const performConnection = Body => {
    const url = emissionService.getUrl('apiConsommationVoiture');

    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: Body,
    })
      .then(response => response.json())
      .then(json => {
        calculResultat(json);
      })
      .catch(e => {
        calculError();
      });
  };

  useEffect(() => {
    setHasResults(false);
    setHasError(false);
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
          Calculez les ??missions de Gaz ?? effet de Serre dues ?? vos trajets.
          <br></br> En tant qu'automobiliste, vous pouvez choisir:
        </p>
        <ul>
          <li>le type de carburant,</li>
          <li>la quantit?? consomm??e.</li>
        </ul>
        <p>
          -> Le calculateur renverra le nombre de kg de CO?? ??mis ainsi que
          l'??nergie en kWh que cela repr??sente.
        </p>
        <Table className="af-table">
          <Table.Header>
            <Table.Tr>
              <Table.Th>Type de Carburant</Table.Th>
              <Table.Th>Consommation (en {uniteCarburant})</Table.Th>
              <Table.Th>R??sultats</Table.Th>
            </Table.Tr>
          </Table.Header>

          <Table.Body>
            <Table.Tr>
              <Table.Td>
                <Select
                  name="typeCarburant"
                  id="typeCarburant"
                  onChange={({ value }) => setChangeCarburant(value)}
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
                <Number
                  id="consommation"
                  name="consommation"
                  value={consommationNumber}
                  type="number"
                  step="0.1"
                  onChange={({ value }) => {
                    setConsommationNumber(value);
                  }}
                />
              </Table.Td>
              <Table.Td>
                {hasResults && (
                  <div>
                    Emission : <b>{emissionResultat} kg de CO??</b>
                  </div>
                )}
                {hasResults && (
                  <div>
                    Energie : <b>{energieResultat} kWh</b>
                  </div>
                )}
                {hasError && (
                  <div>
                    <p className="af-body--error">
                      Une Erreur vient de se produire.
                    </p>
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
