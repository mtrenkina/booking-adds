import './form.js';
import './map.js';
import { advertisements } from './data.js';
import { deactivateForm, activateForm } from './form.js';
import { setUpMap } from './map.js';

deactivateForm();
setUpMap(advertisements);
activateForm();
