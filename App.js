import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './components/HomeScreen'
import GameScreen from './components/GameScreen'
import FinishScreen from './components/FinishScreen'
import ErrorBoundary from './components/ErrorBoundary'
import { Provider } from 'react-redux'
import store from './store'

const Stack = createStackNavigator()

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen name="Finish" component={FinishScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ErrorBoundary>
  )
}
