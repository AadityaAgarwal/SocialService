import * as React from 'react'
import {Text,Touchable,TouchableOpacity,View} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import { Input } from 'react-native-elements'
import AppHeader from '../components/AppHeader'

export default class Issues extends React.Component{

    constructor(){
        super()
        this.state={
            issues:'',
            requirement:'',
        }
    }

    addIssue=()=>{
        db.collection('Issues').add({
            'Issue':this.state.issues,
            'Requirement':this.state.requirement
        })
        this.setState({
            issues:'',
            requirement:''
        })
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:'#107588'}}>

                <AppHeader title="Write Your Issues" />
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