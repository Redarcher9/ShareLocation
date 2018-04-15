/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Share,
  StatusBar
} from 'react-native';
import { PermissionsAndroid,Alert} from 'react-native';
import { Button } from 'react-native';


type Props = {};
export default class Main extends Component<Props> {
  constructor(props) {
    super(props);
    this._sharelocation=this._sharelocation.bind(this);
    this._showResult=this._showResult.bind(this);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      result: ''
    };
  }
  _showResult(result){
    console.log(result)
  }
  _sharelocation() {
    Share.share({message:
    "longitude" + this.state.longitude +
    "latitude" + this.state.latitude
  }).then(this._showResult).catch(err=>console.log(err))
  }
  async requestLocationPermission() {
        const chckLocationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
            alert("You've access for the location");
        } else {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        'title': 'Cool Location App required Location permission',
                        'message': 'We required Location permission in order to get device location ' +
                            'Please grant us.'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    alert("You've access for the location");
                } else {
                    alert("You don't have access for the location");
                }
            } catch (err) {
                alert(err)
            }
        }
    };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <View style={ styles.container }>
      <StatusBar
      backgroundColor="#eb3838"
      barStyle= "light-content"/>
        <Text style={styles.welcome}>Latitude: {this.state.latitude}</Text>
        <Text style={styles.welcome}>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}

        <TouchableHighlight onPress={() => this.requestLocationPermission()}>
          <View style={styles.button}>
            <Text style={styles.textcolor}>Check Permissions</Text>
          </View>
          </TouchableHighlight>
        <TouchableHighlight onPress={this._sharelocation}>
          <View style={styles.button}>
            <Text style={styles.textcolor}>Share Location</Text>
          </View>
          </TouchableHighlight>
      </View>
);
}


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',

  },
  welcome: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
    justifyContent:'flex-start',

  },
  textcolor:{
    fontSize: 20,
    color:'white'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    justifyContent:'flex-end',
  },
  button: {
  backgroundColor: '#eb3838',
  padding: 10,
  margin: 10,
  borderRadius: 5,
  justifyContent:'flex-end'

}
});
