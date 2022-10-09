import * as constants from './constants';

/**
 * ENTITIES_ADD
 */
export const addEntities = payload => ({
  type: constants.ENTITIES_ADD,
  payload,
});
