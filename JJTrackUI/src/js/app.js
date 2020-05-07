import React from "react";
import ReactDOM from "react-dom";
import renderRouter from './Routing/renderRouter';

import "../sass/styles.scss";
import {StatusClient} from './Rest/HealthClient';

console.log(StatusClient);
StatusClient.get();

const app = document.getElementById('app');
ReactDOM.render(renderRouter(), app);

