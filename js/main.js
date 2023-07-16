import {createPhotos} from './mocks/data.js';
import {renderThumbnails} from './render-thumbnail.js';
import {addInputListenerAndValidation} from './overlay.js';

renderThumbnails(createPhotos());
addInputListenerAndValidation();
