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
            registerEmail: '',
            chkPswd: '',
            registerPswd: '',
            fName: '',
            lName: '',
            age: '',
            isModalVisible: false,
            address: '',
        }
    }
    signUp = (email, pswd, confirmPswd) => {
        if (pswd !== confirmPswd) {
            return Alert.alert("Password Does Not Match!")
        }
        else {


            firebase.auth().createUserWithEmailAndPassword(email, pswd)
                .then(() => {

                    db.collection('NewUsers').add({
                        'Age': this.state.age,
                        'FirstName': this.state.fName,
                        'LastName': this.state.lName,
                        'Address': this.state.address,
                        'Email': email,
                    })

                    ToastAndroid.show("User Added", ToastAndroid.SHORT)
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    return Alert.alert(errorMessage)
                });
        }

        this.setState({
            address:'',
            fName:'',
            lName:'',
            registerEmail:'',
            registerPswd:'',
            age:'',
            chkPswd:'',
        })
    }

    login = (email, pswd) => {
        firebase.auth().signInWithEmailAndPassword(email.trim(), pswd)
            .then((response) => {
                ToastAndroid.show("Logged In Successfully", ToastAndroid.SHORT)
                this.props.navigation.navigate('Issues')
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


    showModal = () => {
        return (
            <View>
                <Modal animationType="fade" visible={this.state.isModalVisible}>
                    <ScrollView style={{ width: '100%' }}>
                        <KeyboardAvoidingView>
                            <Text style={{ textAlign: 'center', color: 'red', fontSize: 30, fontWeight: 'bold' }}>Registration</Text>

                            <Input
                                placeholder="First Name"
                                maxLength={10}
                                leftIcon={
                                    <Icon
                                        name="user"
                                        type="simple-line-icons"
                                        size={RFValue(20)}
                                    />}
                                onChangeText={text => {
                                    this.setState({ fName: text })
                                }}
                                value={this.state.fName}
                            />


                            <Input
                                placeholder="Last Name"
                                maxLength={10}
                                // style={styles.loginBox}
                                onChangeText={text => {
                                    this.setState({ lName: text })
                                }}
                                value={this.state.lName}
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
                                    this.setState({ registerEmail: text })
                                }}
                                value={this.state.registerEmail}
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
                                    this.setState({ registerPswd: text })
                                }}
                                value={this.state.registerPswd}
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
                                    this.setState({ chkPswd: text })
                                }}
                                value={this.state.chkPswd}
                            />
                            <Input
                                placeholder="Age"
                                leftIcon={
                                    <Icon
                                        name="calendar"
                                        type="simple-line-icons"
                                        size={RFValue(20)}
                                    />
                                }
                                keyboardType="numeric"
                                maxLength={2}
                                onChangeText={text => {
                                    this.setState({ age: text })
                                }}
                                value={this.state.age}
                            />

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 100, marginRight: 100 }}>
                                <TouchableOpacity onPress={() => {
                                    // ToastAndroid.show('User Added',SHORT)
                                    // this.signUp(this.state.registerEmail, this.state.registerPswd, this.state.chkPswd)
                                    this.signUp(this.state.registerEmail, this.state.registerPswd, this.state.chkPswd)
                                    this.setState({
                                        isModalVisible: false
                                    })
                                }}><Text style={{ color: 'red', fontSize: 20 }}>Register</Text></TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        isModalVisible: false
                                    })
                                }}><Text style={{ color: 'red', fontSize: 20 }}> Cancel</Text></TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>

                </Modal>

            </View>
        )
    }


    render() {

        return (
            <View style={{ backgroundColor: '#107588',flex:1 }}>
                <KeyboardAvoidingView>
                <View>
                    {this.showModal()}
                </View>
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
                    onPress={() => {
                        this.setState({
                            isModalVisible: true
                        })

                    }}><Text style={{ color: '#35867F', fontSize: 20 }}>Sign Up</Text></TouchableOpacity>
            </KeyboardAvoidingView></View>
        )
    }
}