import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';

export default function Settings({ item, index, navigation }) {
    console.log("Settings -> item", item)
    const [ switchValue = item.leagueState, setSwitchValue ] = useState();
    const toggleSwitch = (value) => {
        setSwitchValue(value)
     }
     
      return (
        <View style={styles.row}>
            <View style={[styles.container]}>
                <View style={[styles.homeTeamContainer]}>
                  <Text style={styles.home}>
                    {item.leagueTitle}
                  </Text>
                </View>
                <View style={[styles.awayTeamContainer]}>
                <Switch
                  style={styles.away}
                  onValueChange = {toggleSwitch}
                  value = {switchValue}/>
                </View>
            </View>
        </View>
      );
  }
  
const styles = StyleSheet.create({
  row:{
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor:"#ccc",
    backgroundColor: '#FFF',
    padding: 5,
    width: "100%"    
  },

  container:{
    padding: 10,
    flex: 1, 
    flexDirection: 'row',
    justifyContent: "flex-end",
    backgroundColor: "#fff",
  },

  homeTeamContainer:{
    flex: 0.85,
  },

  awayTeamContainer:{
    flex: 0.15,
  },


  home: {
    marginLeft: 5,
    fontSize: 17,
    lineHeight: 21,
    width: "100%", 
    textAlign: "left"
  },

});