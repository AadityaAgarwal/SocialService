import * as React from 'react'
import { View, Text, FlatList } from 'react-native'
import db from '../config'
import firebase from 'firebase'
import AppHeader from '../components/AppHeader'
import SwipeableFlatlist from '../components/SwipeableFlatlist'
import { Touchable } from 'react-native'
import { TouchableOpacity } from 'react-native'

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
                <AppHeader title="Active Issues" />
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