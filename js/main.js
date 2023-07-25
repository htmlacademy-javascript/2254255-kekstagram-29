import {renderThumbnails, showingFilteredThumbnails} from './render-thumbnail.js';
import {addOverlayListenersAndValidation} from './overlay.js';
import {getData} from './api.js';
import {showAlert, debounce} from './util.js';

try {
  const data = await getData();
  renderThumbnails(data);
  showingFilteredThumbnails(debounce(
    () => renderThumbnails(data)
  ));
} catch (err) {
  showAlert(err.message);
}

addOverlayListenersAndValidation();
