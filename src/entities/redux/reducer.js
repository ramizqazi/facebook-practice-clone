import * as constants from './constants';

export const INITIAL_STATE = {};

export default function reducer(state = INITIAL_STATE, action) {
  const {type, payload} = action;

  switch (type) {
    // ENTITIES_ADD
    case constants.ENTITIES_ADD: {
      const update = {};
      Object.keys(payload).forEach(key => {
        update[key] = Object.entries(payload[key]).reduce(
          (mergedEntities, [id, entity]) => ({
            ...mergedEntities,
            [id]: {
              ...(mergedEntities[id] || {}),
              ...entity,
            },
          }),
          state[key] || {},
        );
      });
      return {
        ...state,
        ...update,
      };
    }

    default:
      return state;
  }
}
