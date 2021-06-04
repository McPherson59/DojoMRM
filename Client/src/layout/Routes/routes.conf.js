import { Transports } from 'pages/Transports/Transports';
import Home from 'pages/Home';

const routes = [{
        name: 'Home',
        path: '/',
        component: Home,
        titlebar: {
            title: '',
            subtitle: '',
        },
    },
    {
        name: 'SimulateurTransports',
        path: '/simulateurtransports',
        component: Transports,
        titlebar: {
            title: '',
            subtitle: '',
        },
    },
];

export default routes;