import React, { useEffect, useState } from 'react';
import { Table, Text, Button, HelpButton } from '@axa-fr/react-toolkit-all';
import { CalculatorService } from '../../services/calc/calculator-service';
import { InstanceService } from '../../services/calc/instance-service';
import './Home.scss';

export const HomeComponent = () => {

  return (
    <>
    <div className="home container">
      <h2 className="af-title--content">Petit mot d'introduction</h2>
        <p className="af-text--content">Ce site a pour but de permettre de comparer les émissions de Gaz à Effet de Serre dues aux activités humaines.
        Si jamais certaines personnes prennent conscience des impacts de certaines activités, ce site aura servi à quelque chose.
        Attention, l'objectif de tout cela n'est pas de culpabiliser des personnes, mais de faire de l'éducation.</p>
        
        <p>
        Si jamais une personne vivait comme un mormon ou un amish, elle ne réduirait que 30% de son empreinte carbone.
        En effet, 70% sont dus à des émissions structurelles de la société (armée, hopital, transports, etc).
        Les actions individuelles sont importantes, mais ne suffisent pas.
        Pour changer l'impact de la société, il faut se mobiliser et changer la manière de porduire des richesses et la manière de les répartir.</p>
        <p>
        Il n'en reste pas moins que les actions individuelles sont importantes.
        Ce site a pour but de vous aider à mesurer vos émissions et à les changer si jamais vous le voulez.</p>
    </div>
    </>
  );
};
