import { actions, fetchStats, fetchStatsFulfilled } from './actions';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { mergeMap, map, mapTo } from 'rxjs/operators';

export const dateRangeEpic = action$ => action$.pipe(
  ofType(actions.SET_DATE_RANGE),
  map(action => ({type: actions.FETCH_STATS, payload: action.payload}))
)


export const fetchStatsEpic = action$ => action$.pipe(
  ofType(actions.FETCH_STATS),
  mergeMap(action => {
    return ajax({
      method: 'GET',
      url: '/motionstats'
    }).pipe(
      map(json => fetchStatsFulfilled(json.response.aggregations))
    )
  }

  )
)
