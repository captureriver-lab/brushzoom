export const actions = {
  FETCH_STATS: "FETCH_STATS",
  FETCH_STATS_FULFILLED: "FETCH_STATS_FULFILLED",
  SET_DATE_RANGE: "SET_DATE_RANGE"
}

export const setDateRange = (payload) => ({type: actions.SET_DATE_RANGE, payload })
export const fetchStats = (payload) => ({type: actions.FETCH_STATS, payload})
export const fetchStatsFulfilled = (payload) => ({type: actions.FETCH_STATS_FULFILLED, payload})
