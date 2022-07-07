import { getParamsFromUrl } from '../utils';

const isDebug = () => getParamsFromUrl('debug');
const showVmServices = () => getParamsFromUrl('vm');
const EXPANDED_SERVICES = ['Management', 'MaticReader'];

const servicesDisplayNameDict: { [key: string]: string } = {
  Management: 'Ethereum chain',
  MaticReader: 'Polygon chain',
};

export { isDebug, EXPANDED_SERVICES, servicesDisplayNameDict, showVmServices };
