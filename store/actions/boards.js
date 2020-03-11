import {
  FETCH_BOARD,
  SET_ERROR,
  SET_LOADING,
  SET_NAME,
  SET_LEVEL,
  SET_BOARD,
  SET_STATUS
} from '../actionTypes'
import axios from 'axios'

const encodeBoard = board =>
  board.reduce(
    (result, row, i) =>
      result +
      `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`,
    ''
  )

const encodeParams = params =>
  Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&')

const baseURL = 'https://sugoku.herokuapp.com'

export const setLoading = value => ({
  type: SET_LOADING,
  payload: value
})

export const setError = value => ({
  type: SET_ERROR,
  payload: value
})
export const setStatus = value => ({
  type: SET_STATUS,
  payload: value
})

export const fetchBoard = value => ({
  type: FETCH_BOARD,
  payload: value
})

export const setBoard = value => ({
  type: SET_BOARD,
  payload: value
})

export const setName = value => ({
  type: SET_NAME,
  payload: value
})

export const setLevel = value => ({
  type: SET_LEVEL,
  payload: value
})

export function getBoard(param = 'easy') {
  return dispatch => {
    dispatch(setLoading(true))
    axios
      .get(`${baseURL}/board?difficulty=${param}`)
      .then(({ data }) => {
        const baseBoard = data.board.map(function(subarray) {
          return subarray.map(function(number) {
            return number === 0 ? 0 : 'reserved'
          })
        })

        const boards = {
          baseBoard,
          board: data.board
        }

        dispatch(fetchBoard(boards))
      })
      .catch(err => {
        dispatch(setError(err.response))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export function validateBoardAsync(board, cb) {
  return dispatch => {
    dispatch(setLoading(true))
    const data = { board }
    axios
      .post(`${baseURL}/validate`, encodeParams(data))
      .then(({ data }) => {
        dispatch(setStatus(data.status))
        cb(data.status)
      })
      .catch(err => {
        dispatch(setError(err.response))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}
export function solveBoardAsync(board) {
  return dispatch => {
    dispatch(setLoading(true))
    const data = { board }
    axios
      .post(`${baseURL}/solve`, encodeParams(data))
      .then(({ data }) => {
        console.log(data)
        dispatch(setBoard(data.solution))
        dispatch(setStatus('solved'))
      })
      .catch(err => {
        console.log(err)
        dispatch(setError(err.response))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}
