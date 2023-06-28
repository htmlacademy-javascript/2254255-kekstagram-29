import {createPhotoDescriptions} from './mocks/data.js';
import {scheduleCheck} from './functions.js';

createPhotoDescriptions();

scheduleCheck('08:00', '17:30', '14:00', 90);
scheduleCheck('8:0', '10:0', '8:0', 120);
scheduleCheck('08:00', '14:30', '14:00', 90);
scheduleCheck('14:00', '17:30', '08:0', 90);
scheduleCheck('8:00', '17:30', '08:00', 900);
