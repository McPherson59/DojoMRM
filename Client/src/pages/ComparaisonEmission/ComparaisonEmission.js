import React, { useState, useEffect } from 'react';
import { Table, Text, Button, HelpButton } from '@axa-fr/react-toolkit-all';
import { DataService } from '../../services/dataaccess/data-service';
import { EmissionService } from '../../services/calc/emission-service';
import './ComparaisonEmission.scss';

export const ComparaisonEmission = () => {
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
          Comparez vos émissions de CO² à des éléments de la vie de tous les
          jours pour bien se représenter les impacts de vos activités.
          <br></br> En tant qu'utilisateur, j'ai fait un use case 1 ou 1bis.
          Puis je choisis:
          <ul>
            <li>un domaine,</li>
            <li>un élément de comparaison.</li>
          </ul>
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
