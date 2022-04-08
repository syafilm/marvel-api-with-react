import base from './api.base';
import extens from './api.extens';

const getListSeries = (limit) => {
  const extensUrl = extens('series', limit);
  return base().get(extensUrl);
}

const ApiSeries = {
  getListSeries
}

export default ApiSeries
