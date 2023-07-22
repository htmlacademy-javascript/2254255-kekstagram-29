import {renderThumbnails} from './render-thumbnail.js';
import {addOverlayListenersAndValidation} from './overlay.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

try {
  renderThumbnails(await getData());
} catch (err) {
  showAlert(err.message);
}

addOverlayListenersAndValidation();
