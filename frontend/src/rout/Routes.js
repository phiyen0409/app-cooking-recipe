import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import LoginWithAppAccount from '../screens/LoginWithAppAccount';
import SignupScreen from '../screens/SignupScreen';

export default class Routes extends React.Component{

    render(){
        return(
            <Router>
                <Stack key="root" hideNavBar = {true}>
                    <Scene key="login" component={LoginWithAppAccount} title="Login"/>
                    <Scene key="signup" component={SignupScreen} title="Signup"/>
                </Stack>
            </Router>
        )
    }
}