import React, { useState, useEffect } from 'react';
import { Table, Number, Button, Select } from '@axa-fr/react-toolkit-all';
import { DataService } from '../../services/dataaccess/data-service';
import { MrmClientService } from '../../services/mrmclient/mrm-client';
import './ComparaisonEmission.scss';

export const ComparaisonEmission = () => {
  const [distanceNumber, setDistanceNumber] = useState(0);
  const [typeCarburant, setTypeCarburant] = useState('');
  const [typeVehicule, setTypeVehicule] = useState('');
  const [typeTrajet, setTypeTrajet] = useState('');
  const [comparaisonDomaine, setComparaisonDomaine] = useState('');
  const [ComparaisonElements, setComparaisonElements] = useState('');

  const [hasResults, setHasResults] = useState(false);
  const [hasComparaison, setHasComparaison] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasComparisonError, setHasComparisonError] = useState(false);
  const [hasDomaine, setHasDomaine] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const Data = new DataService();
  const emissionService = new MrmClientService();

  const [emissionResultat, setEmissionResultat] = useState(0);
  const [energieResultat, setEnergieResultat] = useState(0);
  const [emissionComparaisonElement, setEmissionComparaisonElement] = useState(
    0
  );

  const getCarburantOptions = () => {
    return Data.getCarburantsListeSimple();
  };

  const getTrajetOptions = () => {
    return Data.getTrajetsListe();
  };

  const getTypeVehiculeOptions = () => {
    return Data.getTypeVehiculesListe();
  };

  const getComparaisonDomaineOptions = () => {
    return Data.getComparaisonDomaineListe();
  };

  const getComparaisonElementsOptions = value => {
    return Data.getComparaisonElementsListe(value);
  };

  const calculHandler = async () => {
    const trajets = emissionService.getTrajetsSimples(typeTrajet);

    performConnection(
      emissionService.getBodyTrajet(
        Data.getCarburantSimple(typeCarburant),
        typeVehicule,
        distanceNumber,
        trajets
      ),
      emissionService.getUrl('apiTrajetSimple')
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

  const performConnection = (Body, url) => {
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

  const comparaisonHandler = () => {
    const body = emissionService.getBodyComparaison(
      emissionResultat,
      ComparaisonElements
    );

    performConnectionComparaison(
      body,
      emissionService.getUrl('apiComparaison')
    );
  };

  const performConnectionComparaison = (Body, url) => {
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
        calculResultatComparaison(json);
      })
      .catch(e => {
        calculErrorComparaison();
      });
  };

  const calculResultatComparaison = resultat => {
    setEmissionComparaisonElement(
      emissionService.calculPourcentage(resultat.result)
    );
    setHasComparisonError(false);
    setHasComparaison(true);
  };

  const calculErrorComparaison = () => {
    setHasComparisonError(true);
    setHasComparaison(false);
  };

  const setComparaison = value => {
    setComparaisonDomaine(value);
    setComparaisonElements(false);
    setHasComparaison(false);
    setHasDomaine(true);
  };

  const setElementComparaison = value => {
    setComparaisonElements(value);
    setHasComparaison(false);
  };

  useEffect(() => {
    setHasComparaison(false);
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
          Comparez vos émissions de CO² à des éléments de la vie de tous les
          jours pour bien se représenter les impacts de vos activités.
          <br></br> En tant qu'utilisateur, j'ai fait un use case 1 ou 1bis.
          Puis je choisis:
          <ul>
            <li>un domaine,</li>
            <li>un élément de comparaison.</li>
          </ul>
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
                  step="1"
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
      {hasResults && (
        <div className="container container-body">
          <Table className="af-table">
            <Table.Header>
              <Table.Tr>
                <Table.Th>Domaine</Table.Th>
                <Table.Th>Element de Comparaison</Table.Th>
                <Table.Th>Comparaison</Table.Th>
              </Table.Tr>
            </Table.Header>
            <Table.Body>
              <Table.Tr>
                <Table.Td>
                  <Select
                    name="comparaisonDomaine"
                    id="comparaisonDomaine"
                    onChange={({ value }) => setComparaison(value)}
                    options={getComparaisonDomaineOptions()}
                    value={comparaisonDomaine}
                    placeholder="- Select -"
                    forceDisplayPlaceholder="false"
                    forceDisplayMessage="false"
                    message=""
                    helpMessage=""
                  />
                </Table.Td>
                <Table.Td>
                  {hasDomaine && (
                    <div>
                      <Select
                        name="comparaisonElementsListe"
                        id="comparaisonElementsListe"
                        onChange={({ value }) => setElementComparaison(value)}
                        options={getComparaisonElementsOptions(
                          comparaisonDomaine
                        )}
                        value={ComparaisonElements}
                        placeholder="- Select -"
                        forceDisplayPlaceholder="true"
                        forceDisplayMessage="false"
                        message=""
                        helpMessage=""
                      />
                    </div>
                  )}
                </Table.Td>
                <Table.Td>
                  {hasComparaison && (
                    <div>
                      Le trajet représente :
                      <b>
                        {' '}
                        {emissionComparaisonElement}
                        &nbsp;%
                      </b>{' '}
                      de{' '}
                      {
                        Data.getLabelComparaisonElementsByValue(
                          ComparaisonElements
                        ).item
                      }
                    </div>
                  )}
                  {hasComparisonError && (
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
        </div>
      )}
      {hasResults && (
        <div className="container-center">
          <Button
            disabled={hasComparaison}
            classModifier={classNameBtn}
            id="comparaison-button"
            onClick={comparaisonHandler}>
            <span className="af-btn__text"> Comparer </span>
            <i className="glyphicon glyphicon-stats" />
          </Button>
        </div>
      )}
    </>
  );
};
