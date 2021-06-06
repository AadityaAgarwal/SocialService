import * as React from 'react'
import {Text,Touchable,TouchableOpacity,View,Alert} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import { Input,Header,Icon } from 'react-native-elements'
import AppHeader from '../components/AppHeader'
import { RFValue } from "react-native-responsive-fontsize";

export default class Issues extends React.Component{

    constructor(){
        super()
        this.state={
            issues:'',
            requirement:'',
            email:firebase.auth().currentUser.email,
        }
    }

    addIssue=()=>{
        db.collection('Issues').add({
            'Email':this.state.email,
            'Issue':this.state.issues,
            'Requirement':this.state.requirement,
            'RequestStatus':"unread"
        })
        this.setState({
            issues:'',
            requirement:''
        })
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:'#107588'}}>

                 <Header
                 rightComponent={
                     <Icon name='bell' type='font-awesome' color='#696969' size={25}
                     onPress={() =>this.props.navigation.navigate('UserNotifs')}/>
                 }
                 leftComponent={
                    <Icon name="logout"
                        type="antdesign"
                        size={RFValue(20)}
                        iconStyle={{ paddingLeft: RFValue(10) }} 
                        onPress={
                            () => {
                                return Alert.alert(
                                    'Do You Want To Log Out?',
                                    '',
                                    [
                                        {
                                            text: 'OK', onPress: () => {
                                                this.props.navigation.navigate('Admin')
                                                firebase.auth().signOut()
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
            centerComponent={{ text: "Write Your Issues", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
            backgroundColor = "#eaf8fe"
            />

                <Input 
                placeholder="Issue"
                onChangeText={text=>{
                    this.setState({issues:text})
                }}
                value={this.state.issues}
                />

                <Input 
                placeholder="Requirement"
                onChangeText={text=>{
                    this.setState({requirement:text})
                }}
                value={this.state.requirement}
                />

                <TouchableOpacity 
                onPress={()=>{
                    this.addIssue()
                }}
                style={{ marginTop: 10, borderRadius: 20, backgroundColor: 'white', width: 200, height: 30, alignItems: 'center',alignSelf:'center' }}>
                    <Text style={{ color: '#35867F', fontSize: 20 }}>Submit Request</Text>
                </TouchableOpacity>
            </View>
        )
    }
}