import React from 'react'
import { View, Text, Button } from 'react-native'
import { TextInput, StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { useSelector, useDispatch } from 'react-redux'
import { setName, setLevel } from '../store/actions'

function HomeScreen({ navigation }) {
  const name = useSelector(state => state.boards.name)
  const level = useSelector(state => state.boards.level)
  const dispatch = useDispatch()

  const onStartGameClick = () => {
    navigation.navigate('Game')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to SuGoKu!</Text>
      <Text>Input your name: </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={text => dispatch(setName(text))}
        value={name}
      />
      <Text>Select Level: </Text>
      <RNPickerSelect
        value={level}
        placeholder={{}}
        onValueChange={value => dispatch(setLevel(value))}
        items={[
          { label: 'Easy', value: 'easy' },
          { label: 'Medium', value: 'medium' },
          { label: 'Hard', value: 'hard' }
        ]}
      />
      <Button title="Start Game!" onPress={() => onStartGameClick()} />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
})

export default HomeScreen
