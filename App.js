import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import TabNavigator  from './components/TabNavigator';
import AdminNotifs from './screens/AdminNotifs';
import Issues from './screens/Issues';
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

const SwitchNavigator = createSwitchNavigator({
  // WelcomeScreen: WelcomeScreen,
  // Issues:Issues,
  TabNavigator:TabNavigator,
  //AdminNotifs:AdminNotifs,
})
const AppContainer = createAppContainer(SwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
