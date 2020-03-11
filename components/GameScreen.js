import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { useSelector, useDispatch } from 'react-redux'
import {
  getBoard,
  setBoard,
  validateBoardAsync,
  solveBoardAsync
} from '../store/actions'

function GameScreen({ navigation }) {
  const status = useSelector(state => state.boards.status)

  const name = useSelector(state => state.boards.name)
  const level = useSelector(state => state.boards.level)

  const board = useSelector(state => state.boards.board)
  const baseBoard = useSelector(state => state.boards.baseBoard)
  const dispatch = useDispatch()

  const [isVisible, setIsVisible] = useState(false)

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const [indexValue, setIndex] = useState([0, 0])

  const onModalChange = (i, j) => {
    if (isVisible === false) {
      setIndex([i, j])
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const setNumber = num => {
    board[indexValue[0]][indexValue[1]] = num
    dispatch(setBoard(board))
    setIsVisible(false)
  }

  const validateBoard = () => {
    dispatch(
      validateBoardAsync(board, status => {
        if (status === 'solved') {
          navigation.navigate('Finish')
        }
      })
    )
  }
  const solveBoard = () => {
    dispatch(solveBoardAsync(board))
  }

  useEffect(() => {
    dispatch(getBoard(level))
  }, [dispatch, level])
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Modal isVisible={isVisible} style={styles.view}>
        <View style={styles.container}>
          {numbers.map((num, j) => (
            <TouchableOpacity
              style={styles.colorCanChange}
              onPress={() => setNumber(num)}
              key={j}
            >
              <Text>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.container}>
          <Button title="Cancel" onPress={onModalChange} />
        </View>
      </Modal>
      {status ? <Text>Status: {status}</Text> : null}
      <Text>Level: {level}</Text>
      <Text>Player: {name}</Text>

      {baseBoard &&
        baseBoard.map((row, i) => (
          <View style={styles.container} key={i}>
            {row.map((col, j) => (
              <TouchableOpacity
                style={
                  typeof col === 'string'
                    ? styles.colorCantChange
                    : styles.colorCanChange
                }
                onPress={() => onModalChange(i, j)}
                key={j}
              >
                <Text>{board[i][j]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Button title="Validate Board" onPress={validateBoard} />
        <Button title="Solve" onPress={solveBoard} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  colorCanChange: {
    alignItems: 'center',
    padding: 10,
    height: 40,
    width: 40,
    backgroundColor: '#FFFFFF'
  },
  colorCantChange: {
    alignItems: 'center',
    padding: 10,
    height: 40,
    width: 40,
    backgroundColor: '#DDDDDD'
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 590
  }
})

export default GameScreen
