import {
  FETCH_BOARD,
  SET_LOADING,
  SET_ERROR,
  SET_NAME,
  SET_LEVEL,
  SET_BOARD,
  SET_STATUS
} from '../actionTypes'

const initialState = {
  board: [[]],
  baseBoard: [[]],
  name: '',
  level: 'easy',
  status: '',
  error: null,
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_BOARD: {
      return {
        ...state,
        board: action.payload.board,
        baseBoard: action.payload.baseBoard
      }
    }
    case SET_BOARD: {
      return { ...state, board: action.payload }
    }
    case SET_NAME: {
      return { ...state, name: action.payload }
    }
    case SET_STATUS: {
      return { ...state, status: action.payload }
    }
    case SET_LEVEL: {
      return { ...state, level: action.payload }
    }
    case SET_LOADING: {
      return { ...state, loading: action.payload }
    }
    case SET_ERROR: {
      return { ...state, error: action.payload }
    }
  }
  return state
}
