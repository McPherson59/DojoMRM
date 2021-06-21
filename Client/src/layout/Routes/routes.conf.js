import { ConsommationVoiture } from 'pages/ConsommationVoiture/ConsommationVoiture';
import { TrajetSimple } from 'pages/TrajetSimple/TrajetSimple';
import { TrajetMixte } from 'pages/TrajetMixte/TrajetMixte';
import { ComparaisonEmission } from 'pages/ComparaisonEmission/ComparaisonEmission';
import Home from 'pages/Home';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
    titlebar: {
      title: '',
      subtitle: '',
    },
  },
  {
    name: 'SimulateurConsommationVoiture',
    path: '/simulateurconsommationvoiture',
    component: ConsommationVoiture,
    titlebar: {
      title: 'Use Case 1',
      subtitle: 'Emission de CO² pour une consommation donnée',
    },
  },
  {
    name: 'SimulateurTrajetSimple',
    path: '/simulateurtrajetsimple',
    component: TrajetSimple,
    titlebar: {
      title: 'Use Case 1 bis',
      subtitle: 'Emission de CO² pour un trajet simple',
    },
  },
  {
    name: 'SimulateurTrajetMixte',
    path: '/simulateurtrajetmixte',
    component: TrajetMixte,
    titlebar: {
      title: 'Use Case 1 ter',
      subtitle: 'Emission de CO² pour un trajet Mixte',
    },
  },
  {
    name: 'SimulateurComparaisonEmission',
    path: '/simulateurcomparaisonemission',
    component: ComparaisonEmission,
    titlebar: {
      title: 'Use Case 2',
      subtitle: 'Comparaison Emission CO²',
    },
  },
];

export default routes;
