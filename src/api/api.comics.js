import base from './api.base';
import extens from './api.extens';

const getListComics = (limit) => {
  const extensUrl = extens('comics', limit);
  return base().get(extensUrl);
}

const ApiComics = {
  getListComics
}

export default ApiComics
