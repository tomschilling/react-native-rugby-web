import React, {useEffect, useState} from 'react';
import {
    FlatList,
    StyleSheet,
    SafeAreaView,
    View,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getSettings } from "../actions/SettingsActions";
import SettingsListItem from "../components/SettingsListItem";

export default function Settings({ route }) {
    const dispatch = useDispatch();
   // const { navigation } = props;

    // VARIABLES
    const [isFetching, setIsFetching] = useState(false);

    // Access Redux Store State
    const settingsReducer = useSelector((state) => state.settingsReducer);
    const { settings } = settingsReducer;


    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        async function getSettingsData() {
            setIsFetching(true);
            
            const settings = await AsyncStorage.getItem('settings')
            console.log("getData -> settings", settings)
            
            dispatch(getSettings(JSON.parse(settings)));
        
            setIsFetching(false)
        }
        getSettingsData()
    }, []);

    //==================================================================================================

    //3 - GET FLATLIST DATA
    // async function getLocalSettings() {
    //     try {
    //         const settings = await AsyncStorage.getItem('settings', (err, data) => {
    //             console.log("checkLocalData -> data", data)
    //                 //if it doesn't exist, extract from json fil
    //                 if (data === null){
    //                     try {
    //                     const initialSettings = AsyncStorage.setItem('settings', JSON.stringify(SampleData.settings));//save the initial data in Async
                        
    //                     return new Promise(function(resolve) {
    //                         if (initialSettings) {
    //                           resolve(initialSettings);
    //                         }
    //                       });

    //                     } catch (error) {

    //                     console.log("getSettings -> error -> initialSettings", error)

    //                     }
                        
    //                 }             
    //             });
                
    //         if (settings !== null) {
    //             return new Promise(function(resolve) {
    //                 if (settings) {
    //                   resolve(settings);
    //                 }
    //               });
    //         }
    //       } catch (error) {

    //         console.log("getSettings -> error", error)

    //       }

    // };

    const renderItem = ({item, index}) => {
        return (
            <SettingsListItem item={item} index={index} navigation={route}/>
        )
    };

    // RENDER
    if (isFetching) {
        return (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator animating={true}/>
            </View>
        );
    } else{
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={settings}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `settings_${index}`}/>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: '#F5F5F5'
    },

    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});

