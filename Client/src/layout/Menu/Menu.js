import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavBar, NavBarItem } from '@axa-fr/react-toolkit-all';

import './Menu.scss';

export const Menu = ({ location }) => (
  <NavBar positionInit={-1} onClick={() => {}} isVisible>
    <NavBarItem
      classModifier={classNames({
        active: location && location.pathname === '/',
      })}
      actionElt={
        <Link className="af-nav__link" to="/">
          Home
        </Link>
      }
    />
    <NavBarItem
      classModifier={classNames({
        active:
          location && location.pathname === '/simulateurConsommationVoiture',
      })}
      actionElt={
        <Link className="af-nav__link" to="/simulateurconsommationvoiture">
          Exercice 1
        </Link>
      }
    />
    <NavBarItem
      classModifier={classNames({
        active: location && location.pathname === '/simulateurTrajetSimple',
      })}
      actionElt={
        <Link className="af-nav__link" to="/simulateurtrajetsimple">
          Exercice 1 bis
        </Link>
      }
    />
    <NavBarItem
      classModifier={classNames({
        active: location && location.pathname === '/simulateurTrajetMixte',
      })}
      actionElt={
        <Link className="af-nav__link" to="/simulateurtrajetmixte">
          Exercice 1 ter
        </Link>
      }
    />
    <NavBarItem
      classModifier={classNames({
        active:
          location && location.pathname === '/simulateurComparaisonEmission',
      })}
      actionElt={
        <Link className="af-nav__link" to="/simulateurcomparaisonemission">
          Exercice 2
        </Link>
      }
    />
  </NavBar>
);

const propTypes = {
  location: PropTypes.object.isRequired,
};

Menu.propTypes = propTypes;
