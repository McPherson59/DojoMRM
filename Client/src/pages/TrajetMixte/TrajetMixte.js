import React, { useState, useEffect } from 'react';
import { Table, Text, Button, HelpButton } from '@axa-fr/react-toolkit-all';
import { DataService } from '../../services/dataaccess/data-service';
import { EmissionService } from '../../services/calc/emission-service';
import './TrajetMixte.scss';

export const TrajetMixte = () => {
  const [emissionNumber, setEmissionNumber] = useState(0);

  const [hasResults, setHasResults] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const emissionService = new EmissionService();
  //const emissionData = calculatorService.getEmmissionData('');
  const emissionData = 0;

  useEffect(() => {
    setHasResults(false);
    if (emissionNumber > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [emissionNumber]);

  const classNameBtn = isDisabled
    ? 'hasiconLeft calculate disabled'
    : 'hasiconLeft calculate';
  return (
    <>
      <div className="container container-body">
        <p className="af-body--content">
          {' '}
          Calculez les émissions de Gaz à effet de Serre dues à vos trajets.
          <br></br> En tant qu'automobiliste, vous pouvez choisir:
          <ul>
            <li>le type de carburant,</li>
            <li>la taille de voiture,</li>
            <li>
              les types de trajet et le pourcentage que cela représente par
              rapport au total,
            </li>
            <li>le nombre de km parcouris.</li>
          </ul>{' '}
          -> Le calculateur renverra le nombre de kg de CO² émis ainsi que
          l'énergie en kWh que cela représente.
        </p>{' '}
        <Table className="af-table">
          <Table.Header>
            <Table.Tr>
              <Table.Th>
                <span className="af-table-th-content">
                  <span
                    data-toggle="tooltip"
                    data-placement="top"
                    title="144€ /mois">
                    i1{' '}
                  </span>{' '}
                  <HelpButton classModifier="small" mode="hover">
                    <ul>
                      <li> Prix: {emissionData.coutMensuel}€ /mois</li>
                      <li> Ressources: </li>{' '}
                      <ul>
                        <li>
                          {' '}
                          {emissionData.acu}
                          ACU{' '}
                        </li>{' '}
                        <li>
                          {' '}
                          {emissionData.ram}
                          Go RAM{' '}
                        </li>{' '}
                      </ul>{' '}
                    </ul>{' '}
                  </HelpButton>{' '}
                </span>{' '}
              </Table.Th>{' '}
            </Table.Tr>{' '}
          </Table.Header>{' '}
          <Table.Body>
            <Table.Tr>
              <Table.Td>
                <Text
                  id="i1-nb"
                  name="i1-nb"
                  value={emissionNumber}
                  onChange={({ value }) => 0}
                />{' '}
              </Table.Td>{' '}
            </Table.Tr>{' '}
          </Table.Body>{' '}
        </Table>
        <div className="container-center">
          <Button
            disabled={isDisabled}
            classModifier={classNameBtn}
            id="validation-button">
            <span className="af-btn__text"> Calculer </span>{' '}
            <i className="glyphicon glyphicon-stats" />
          </Button>{' '}
        </div>
      </div>{' '}
    </>
  );
};
