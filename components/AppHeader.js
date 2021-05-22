import * as React from 'react'
import {Header} from 'react-native-elements'

export default class AppHeader extends React.Component{
    render(){
        return(
            <Header
            centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
            backgroundColor = "#eaf8fe"
            />
        )
    }
}