import * as React from 'react'
import { View, Text, TouchableOpacity, ToastAndroid, Alert, Modal, ScrollView, KeyboardAvoidingView,StyleSheet } from 'react-native'
import db from '../config'
import firebase from 'firebase'
import { Input } from 'react-native-elements'
import LottieView from 'lottie-react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import NewIcon from 'react-native-vector-icons/FontAwesome'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default class UserLogin extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            pswd: '',
            confirmPswd: '',
            chkPswd: '',
            chkEmail: '',
            isModalVisible: false,
            Fname: '',
            Lname: '',
            MobileNo: '',
            address: '',
        }
    }

    login = (email, pswd) => {
        firebase.auth().signInWithEmailAndPassword(email.trim(), pswd)
            .then((response) => {
                ToastAndroid.show("Logged In Successfully", ToastAndroid.SHORT)
                this.props.navigation.navigate('Issue')
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
            })

        this.setState({
            email: '',
            pswd: ''
        })
    }
    signUp = (email, pswd, confirmPswd) => {
        if (pswd !== confirmPswd) {
            return Alert.alert("Password Does Not Match!")
        }
        else {


            firebase.auth().createUserWithEmailAndPassword(email, pswd)
                .then((response) => {
                    this.props.navigation.navigate('Issue')
                    db.collection('NewUsers').add({
                        'Email':email,
                        'FirstName':this.state.Fname,
                        'LastName':this.state.Lname,
                        'MobileNo':this.state.MobileNo,
                        'Address':this.state.address
                    })
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    return Alert.alert(errorMessage)
                });
        }
    }
    showModal = () => {
        return (
            <Modal animationType="fade" transparent={true} visible={this.state.isModalVisible}>

                <View style={{ backgroundColor: 'white', flex: 1, borderRadius: 20, alignItems: 'center', marginLeft: 30, marginRight: 30, marginBottom: 80, marginTop: 80 }}>
                    <ScrollView style={{ width: '100%' }}>
                        <KeyboardAvoidingView>
                            <Text style={{ textAlign: 'center', color: 'red', fontSize: 30, fontWeight: 'bold' }}>Registration</Text>
                            <Input
                                placeholder="First Name"
                                maxLength={10}
                                // style={styles.loginBox}
                                leftIcon={
                                    <Icon
                                        name="user"
                                        type="simple-line-icons"
                                        size={RFValue(20)}
                                    />}
                                onChangeText={text => {
                                    this.setState({ Fname: text })
                                }}
                                value={this.state.Fname}
                            />

                            <Input
                                placeholder="Last Name"
                                maxLength={10}
                                // style={styles.loginBox}
                                onChangeText={text => {
                                    this.setState({ Lname: text })
                                }}
                                value={this.state.Lname}
                                leftIcon={
                                    <Icon
                                        name="user"
                                        type="simple-line-icons"
                                        size={RFValue(20)}
                                    />}
                            />

                            <Input
                                placeholder="Contact Number"
                                maxLength={10}
                                keyboardType="numeric"
                                //   style={styles.loginBox}
                                onChangeText={text => {
                                    this.setState({ MobileNo: text })
                                }}
                                value={this.state.MobileNo}
                                leftIcon={
                                    <Icon
                                        name="phone"
                                        type="simple-line-icons"
                                        size={RFValue(20)}
                                    />}
                            />
                            <Input
                                placeholder="Address"
                                multiline={true}

                                onChangeText={text => {
                                    this.setState({ address: text })
                                }}
                                value={this.state.address}
                                leftIcon={
                                    <NewIcon
                                        name="address-book"
                                        type="font-awesome"
                                        size={RFValue(20)}
                                    />}
                            />
                            <Input
                                placeholder="Email"
                                leftIcon={
                                    <NewIcon
                                        name="envelope"
                                        type="font-awesome"
                                        size={RFValue(20)}
                                    />}
                                keyboardType="email-address"
                                onChangeText={text => {
                                    this.setState({ chkEmail: text })
                                }}
                                value={this.state.chkEmail}
                            />

                            <Input
                                placeholder="Password"
                                leftIcon={
                                    <NewIcon
                                        name="lock"
                                        type="font-awesome"
                                        size={RFValue(20)}
                                    />}
                                secureTextEntry={true}
                                onChangeText={text => {
                                    this.setState({ chkPswd: text })
                                }}
                                value={this.state.chkPswd}
                            />
                            <Input
                                placeholder="Confirm Password"
                                leftIcon={
                                    <NewIcon
                                        name="lock"
                                        type="font-awesome"
                                        size={RFValue(20)}
                                    />}
                                secureTextEntry={true}
                                onChangeText={text => {
                                    this.setState({ confirmPswd: text })
                                }}
                                value={this.state.confirmPswd}
                            />

                            <View style={{ flex: 1, justifyContent: 'space-between', marginLeft: 100, marginRight: 100 }}>
                                <TouchableOpacity onPress={() => {

                                    this.signUp(this.state.chkEmail, this.state.chkPswd, this.state.confirmPswd)
                                }}><Text style={{ color: 'red', fontSize: 20 }}>Register</Text></TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        isModalVisible: false
                                    })
                                }}><Text style={{ color: 'red' }}> Cancel</Text></TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>

                    </ScrollView>

                </View>
            </Modal>
        )
    }
    render() {
        return (
            <View style={{ flex: 1,backgroundColor: '#107588' }} >
                <Text style={{color:'blue',fontSize:40,textAlign:'center',marginTop:50}}>Welcome User!</Text>
                <View>
                    {this.showModal()}
                </View>
                <View style={{ flex: 1, alignItems: 'center', marginTop: 100, }}>

                    <Input
                        placeholder="Email"
                        leftIcon={
                            <NewIcon
                                name="envelope"
                                type="font-awesome"
                                size={RFValue(20)}
                            />}
                        keyboardType="email-address"
                        onChangeText={text => {
                            this.setState({ email: text })
                        }}
                        value={this.state.email}
                        placeholderTextColor={'#35867F'}
                    />

                    <Input
                        placeholder="Password"
                        //   style={styles.login}
                        secureTextEntry={true}
                        leftIcon={
                            <Icon
                                name="lock"
                                size={RFValue(20)}
                            />
                        }
                        onChangeText={text => {
                            this.setState({ pswd: text })
                        }}
                        value={this.state.pswd}
                        placeholderTextColor={'#35867F'}
                    />

                    <TouchableOpacity style={{ marginTop: 10, borderRadius: 20, backgroundColor: 'white', width: 200, height: 30, alignItems: 'center' }}
                        onPress={() => {
                            this.login(this.state.email, this.state.pswd)
                        }

                        }><Text style={{ color: '#35867F', fontSize: 20 }}>Login</Text></TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 10, borderRadius: 20, backgroundColor: 'white', width: 200, height: 30, alignItems: 'center' }}
                        onPress={() => {
                            this.setState({
                                isModalVisible: true
                            })

                        }}><Text style={{ color: '#35867F', fontSize: 20 }}>Sign Up</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    loginBox: {
        width: '75%',
        height: 40,
        borderWidth: 2,
        margin: 10,
        paddingLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'red',
        borderRadius: 20,
        alignSelf: 'center'
    },
    login: {
        width: '75%',
        height: 40,
        borderWidth: 2,
        margin: 10,
        paddingLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
})



