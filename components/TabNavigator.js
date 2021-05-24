import * as React from 'react'
import { Image } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Issues from '../screens/Issues';
import WelcomeScreen from '../screens/WelcomeScreen'



export const TabNavigation=createBottomTabNavigator({
    Admin:{
        screen:WelcomeScreen
    },
    Issue:{
        screen:Issues
    }
},
{
    defaultNavigationOptions:({navigation})=>({
        tabBarIcon:()=>{
            const routename=navigation.state.routeName
            if(routename===Admin){
                return(
                    <Image 
                    source={require('../assets/favicon.png')}
                    style={{
                        width:40,
                        height:40
                    }}
                    />
                )
            }
            else if(routename===Issue){
                return(
                    <Image 
                    
                    source={require('../assets/icon.png')}
                    style={{
                        width:40,
                        height:40
                    }}
                    />
                )
            }
        }
    
    })
}
)
        