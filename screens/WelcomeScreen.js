import * as React from 'react'
import { View, Text, TouchableOpacity, ToastAndroid, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native'
import db from '../config'
import firebase from 'firebase'
import { Input } from 'react-native-elements'
import LottieView from 'lottie-react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import NewIcon from 'react-native-vector-icons/FontAwesome'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default class WelcomeScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            email: '',
            pswd: '',
        }
    }

    login = (email, pswd) => {
        firebase.auth().signInWithEmailAndPassword(email.trim(), pswd)
            .then((response) => {
                ToastAndroid.show("Logged In Successfully", ToastAndroid.SHORT)
                this.props.navigation.navigate('AdminNotifs')
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
            })

            this.setState({
                email:'',
                pswd:''
            })
    }

    render() {

        return (
            <View style={{ backgroundColor: '#107588',flex:1 }}>
                <KeyboardAvoidingView>
                
                <LottieView
                    source={require('../assets/social.json')}
                    style={{ width: '100%', alignSelf: 'center', marginTop: 1 }}
                    autoPlay loop
                />
                <Input
                    placeholder="abc@gmail.com"
                    keyboardType='email-address'
                    onChangeText={text => {
                        this.setState({
                            email: text
                        })
                    }}
                    leftIcon={
                        <NewIcon
                            name="envelope"
                            type="font-awesome"
                            size={RFValue(20)}

                        />}
                    value={this.state.email}
                />

                <Input
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={text => {
                        this.setState({
                            pswd: text
                        })
                    }}
                    leftIcon={
                        <NewIcon
                            name="lock"
                            type="font-awesome"
                            size={RFValue(20)}
                        />}
                    value={this.state.pswd}
                />

                <TouchableOpacity style={{ marginTop: 10, borderRadius: 20, backgroundColor: 'white', width: 200, height: 30, alignItems: 'center',alignSelf:'center' }}
                    onPress={() => {
                        this.login(this.state.email, this.state.pswd)
                    }

                    }><Text style={{ color: '#35867F', fontSize: 20 }}>Login</Text></TouchableOpacity>

                     <TouchableOpacity style={{ marginTop: 10, borderRadius: 20, backgroundColor: 'white', width: 200, height: 30, alignItems: 'center',alignSelf:'center' }}
                   onPress={()=>{
                       this.props.navigation.navigate('Issue')
                   }}
                   ><Text style={{ color: '#35867F', fontSize: 20 }}>User</Text></TouchableOpacity>
            </KeyboardAvoidingView></View>
        )
    }
}