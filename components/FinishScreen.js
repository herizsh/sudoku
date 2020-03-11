import * as React from 'react'
import { View, Text, Button } from 'react-native'

function FinishScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Congratulations!</Text>
      <Text>You've just finished the sugoku game!</Text>
      <Button
        title="Restart Game!"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  )
}

export default FinishScreen
