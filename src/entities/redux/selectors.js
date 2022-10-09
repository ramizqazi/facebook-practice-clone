import {denormalize} from 'normalizr';

import * as schema from '../api/schema';

/**
 * Get entities
 */
export const getEntities = state => state.Entities;

/**
 * Get user by id
 */
export const getProfile = (state, {id, normalize}) =>
  normalize
    ? state.Entities.profiles && state.Entities.profiles[id]
    : denormalize(id, schema.profile, state.Entities);

/**
 * Get post by id
 */
export const getPost = (state, {id, normalize}) =>
  normalize
    ? state.Entities.posts && state.Entities.posts[id]
    : denormalize(id, schema.post, state.Entities);
