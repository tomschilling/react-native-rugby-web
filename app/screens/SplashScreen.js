import React, { useEffect } from 'react';
import { AsyncStorage, StyleSheet, View, Text } from 'react-native';
import SampleData from '../sample'

export default function SplashScreen({ navigation }) {

    useEffect(() => {
        async function checkLocalData() {

            const isPopulated = await checkIsPopulated()

            if (!isPopulated) {
                AsyncStorage.setItem('settings', JSON.stringify(SampleData.settings));
            }
    
            setTimeout(
                () => { navigation.navigate('MainTabContainer')},
                2000
            )
    
        }
        checkLocalData()
    }, []);

    const checkIsPopulated = async() => {
        return new Promise((resolve) =>
        AsyncStorage.getItem('settings', (err, data) => {
            if (data === null) {
                resolve(false) 
            } else {
                resolve(true) 
            }
        })
        )
      }

    return (
        <View style={styles.viewStyles}>
            <Text style={styles.textStyles}>
                RugbyWeb
            </Text>
        </View>
    );
}
  
const styles = StyleSheet.create({
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    textStyles: {
        color: 'black',
        fontSize: 40
    }
})