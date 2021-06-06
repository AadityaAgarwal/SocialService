import * as React from 'react'
import { View, Text, FlatList,Alert } from 'react-native'
import db from '../config'
import firebase from 'firebase'
import AppHeader from '../components/AppHeader'
import SwipeableFlatlist from '../components/SwipeableFlatlist'
import { Touchable } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { RFValue } from "react-native-responsive-fontsize";
import { Header, Icon } from 'react-native-elements'
export default class AdminNotifs extends React.Component {

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
        var docId
        this.requestRef = db.collection('Issues').where('RequestStatus', '==', 'unread')
            .onSnapshot(snapshot => {
                var all_issues = []
                snapshot.forEach(doc => {
                    docId = doc.id
                    var issues = doc.data()
                    issues["doc_id"] = doc.id;
                    all_issues.push(issues)

                })
                this.setState({ all_issues: all_issues, docId: docId })
            })

    }

    updateNotif = () => {
        db.collection('Issues').doc(this.state.docId).update({
            'RequestStatus': 'read'
        })
    }

    componentDidMount = async () => {
        this.fetchData();
        console.log(this.state.all_issues)
    }
    render() {
        return (
            <View>
              <Header
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
            centerComponent={{ text: "Available Notifications", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
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
                                                <Text style={{ fontWeight: 'bold' }}>{item.Issue}</Text>
                                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                                    <Text>{item.Requirement} </Text>
                                                    <TouchableOpacity onPress={() => { this.updateNotif() }} style={{ borderRadius: 10, marginLeft: 200, borderColor: 'orange', borderWidth: 3, }}  >
                                                        <Text>Mark Read</Text>
                                                    </TouchableOpacity>
                                                </View>
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