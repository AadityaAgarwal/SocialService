import * as React from 'react'
import { View, Text, FlatList } from 'react-native'
import db from '../config'
import firebase from 'firebase'
import AppHeader from '../components/AppHeader'
import SwipeableFlatlist from '../components/SwipeableFlatlist'
import { Input,Header,Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'

export default class UserNotifs extends React.Component{

    constructor() {
        super()
        this.state = {
            all_issues: [],
            email: firebase.auth().currentUser.email,
            docId: '',
        }
        this.requestRef = null
    }
    fetchData = () => {
       
        this.requestRef = db.collection('Issues').where('RequestStatus', '==', 'read')
            .onSnapshot(snapshot => {
                var all_issues = []
                snapshot.forEach(doc => {
                    var all_issue=doc.data()
                    all_issues.push(all_issue)

                })
                this.setState({ all_issues: all_issues})
            })

    }
    componentDidMount = async () => {
        this.fetchData();
    }
    render(){
        return(
            <View>
               <Header 
               leftComponent={
                   <Icon name='arrow-left' type='feather' color='#696969' onPress={()=>{this.props.navigation.navigate('Issue')}} />
               }
               centerComponent={{ text: "Accepted Requests", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
               backgroundColor = "#eaf8fe"
               />
                {this.state.all_issues.length === 0 ? (
                    <View>
                        <Text>No active Issues</Text>
                    </View>
                ) :
                    (


                        <FlatList
                            data={this.state.all_issues}
                            renderItem={
                                ({ item }) => (
                                    <View style={{ borderBottomWidth: 2 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ marginTop: 10 }}>
                                                <Text style={{ fontWeight: 'bold' }}> Issue: {item.Issue}</Text>
                                                    <Text> Requirement: {item.Requirement} </Text>
                                                    <Text> Status: The admin has shown interest in your issues</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }
                            keyExtractor={(item, index) => {
                                index.toString();
                            }}
                        />
                        // <SwipeableFlatlist allNotifications={this.state.all_issues} />
                    )}
            </View>
        )
    }
}