import { LOG_OUT } from './auth';

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case LOG_OUT:
      return [];
    default:
      return state;
  }
}
