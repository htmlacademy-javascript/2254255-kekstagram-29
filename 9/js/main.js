import {createPhotos} from './mocks/data.js';
import {renderThumbnails} from './render-thumbnail.js';
import {overlayScript} from './overlay.js';

renderThumbnails(createPhotos());
overlayScript();
