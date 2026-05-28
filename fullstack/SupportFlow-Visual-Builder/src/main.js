import { App } from './App.js';
import flowData from '../flow_data.json';

const root = document.getElementById('root');
const app = new App(root, flowData);
app.mount();
