import React, { useState, useEffect } from 'react';
import { CardPrice } from 'pages/ConsommationVoiture/CardPrice/CardPrice';
import { Table, Text, Button, HelpButton } from '@axa-fr/react-toolkit-all';
import { CalculatorService } from '../../services/calc/calculator-service';
import { InstanceService } from '../../services/calc/instance-service';
import './ConsommationVoiture.scss';

export const ConsommationVoiture = () => {
  const [consommationNumber, setConsommationNumber] = useState(0);
  const [typeCarburant, setTypeCarburant] = useState('');

  const [hasResults, setHasResults] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const calculatorService = new InstanceService();
  //const emissionData = calculatorService.getEmmissionData('');
  const emissionData = 0;
  const energieData = 0;

  useEffect(() => {
    setHasResults(false);
    if (consommationNumber > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [consommationNumber]);

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
            <li>le nombre de litres consommés.</li>
          </ul>{' '}
          -> Le calculateur renverra le nombre de kg de CO² émis ainsi que
          l'énergie en kWh que cela représente.
        </p>{' '}
        <Table className="af-table">
          <Table.Body>
            <Table.Tr>
              <Table.Td>Type de Carburant :</Table.Td>
              <Table.Td>
                <span>
                  <Text
                    id="typeCarburant"
                    name="typeCarburant"
                    value={typeCarburant}
                    onChange={({ value }) => 0}
                  />
                </span>{' '}
              </Table.Td>{' '}
              <Table.Td>
                Emission : <b>{emissionData} kg de CO²</b>{' '}
              </Table.Td>{' '}
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Consommation (en L) :</Table.Td>{' '}
              <Table.Td>
                <Text
                  id="consommation"
                  name="consommation"
                  value={consommationNumber}
                  onChange={({ value }) => 0}
                />{' '}
              </Table.Td>{' '}
              <Table.Td>
                <p>
                  Energie : <b>{energieData} kWh</b>
                </p>{' '}
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
