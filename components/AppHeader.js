import * as React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { Header, Icon } from 'react-native-elements'
import { RFValue } from "react-native-responsive-fontsize";
import firebase from 'firebase'
import db from '../config'

export default class AppHeader extends React.Component {
    render() {
        return (
            <Header
                leftComponent={
                    <Icon name="logout"
                        type="antdesign"
                        size={RFValue(20)}
                        iconStyle={{ paddingLeft: RFValue(10) }} 
                        onPress={
                            () => {
                                firebase.auth().signOut()
                                return Alert.alert(
                                    'Do You Want To Log Out?',
                                    '',
                                    [
                                        {
                                            text: 'OK', onPress: () => {
                                                this.props.navigation.navigate('Admin')
                                            }
                                        },
                                        {
                                            text: 'Cancel', onPress: () => {
                                                this.props.navigation.navigate('Issue')
                                            }
                                        }
                                    ]
                                )
                               
                            }
                        }
                        />}
                centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize: 20, fontWeight: "bold", } }}
                backgroundColor="#eaf8fe"
            />
        )
    }
}