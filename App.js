import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import AdminNotifs from './screens/AdminNotifs';
import Issues from './screens/Issues';
import UserLogin from './screens/UserLogin';
import UserNotifs from './screens/UserNotifs';
import WelcomeScreen from './screens/WelcomeScreen'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }
}


const SwitchNavigator=createSwitchNavigator({
  Admin:{
    screen:WelcomeScreen
},
Issue:{
    screen:Issues
},
AdminNotifs:{
  screen:AdminNotifs
},
UserLogin:UserLogin,
UserNotifs:UserNotifs,
})

const AppContainer = createAppContainer(SwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
