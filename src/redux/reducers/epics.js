import { dateRangeEpic, fetchStatsEpic } from './stats/epics'
import { combineEpics } from 'redux-observable';

export default combineEpics(
  dateRangeEpic,
  fetchStatsEpic
)
