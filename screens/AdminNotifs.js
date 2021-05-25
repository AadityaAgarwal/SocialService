import * as React from 'react'
import {View,Text, FlatList} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import AppHeader from '../components/AppHeader'

export default class AdminNotifs extends React.Component{

    constructor(){
        super()
        this.state={
            all_issues:[],
        }
        this.requestRef=null
    }
    fetchData=()=>{
        this.requestRef=db.collection('Issues')
        .onSnapshot(snapshot=>{
            var all_issues=[]
            snapshot.forEach(doc=>{
                all_issues.push(doc.data())
            })
            this.setState({all_issues:all_issues})
        })
        
    }
    componentDidMount = async () => {
        this.fetchData();
    }
    render(){
        return(
            <View>  
                <AppHeader title="Active Issues" />
                    {this.state.all_issues.length===0?(
                        <View>
                            <Text>No active Issues</Text>
                        </View>
                    ):
                    (

                    
                <FlatList 
                data={this.state.all_issues}
                renderItem={
                    ({item}) =>(
                        <View style={{ borderBottomWidth: 2 }}>
                            <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{fontWeight:'bold'}}>{item.Issue}</Text>
                                <Text>{item.Requirement} </Text>
                            </View>
                            </View>
                        </View>
                    )
                }   
                keyExtractor={(item, index) => {
                    index.toString();
                }}
                />
        )}
            </View>
        )
    }
}