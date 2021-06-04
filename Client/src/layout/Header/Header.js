import React from 'react';
import logo from '@axa-fr/react-toolkit-core/dist/assets/logo-axa.svg';
import { Header, Name } from '@axa-fr/react-toolkit-all';
import './Header.scss';

const HeaderComponent = () => ( <
    Header >
    <
    Name title = "Simulateur Emission Gaz à Effet de Serre"
    img = { logo }
    alt = "Logo" / >
    <
    /Header>
);

export default HeaderComponent;