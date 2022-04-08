import base from './api.base';
import extens from './api.extens';

const getListStories = (limit) => {
  const extensUrl = extens('stories', limit);
  return base().get(extensUrl);
}

const ApiStories = {
  getListStories
}

export default ApiStories
