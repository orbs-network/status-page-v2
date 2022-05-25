import { getParamsFromUrl } from '../utils';

const isDebug = () => getParamsFromUrl('debug');
const EXPANDED_SERVICES = ['Management', 'MaticReader'];
export { isDebug, EXPANDED_SERVICES };
