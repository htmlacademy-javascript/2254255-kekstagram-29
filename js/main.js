import {createPhotos} from './mocks/data.js';
import {renderThumbnails} from './render-thumbnail.js';
import {addOverlayListenersAndValidation} from './overlay.js';

renderThumbnails(createPhotos());
addOverlayListenersAndValidation();
