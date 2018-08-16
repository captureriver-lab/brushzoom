import { actions } from './actions'
import moment from 'moment';

export default (state = {
  stats: {
    event_over_time: {
      buckets: []
    }
  },
  date_range: {
    from: moment().subtract(1, 'months').format(),
    to: moment().format()
  }
}, action) => {
  switch (action.type) {
    case actions.FETCH_STATS_FULFILLED:
      return {
        ...state,
        stats: action.payload
      }
    case actions.SET_DATE_RANGE:
      return {
        ...state,
        date_range: action.payload
      }
    default:
      return state;
  }
}
