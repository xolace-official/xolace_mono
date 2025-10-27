import { View, StyleSheet } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import { DrawerToggleButton } from '@react-navigation/drawer';
import {Bell} from "@xolacekit/ui";

import {Text} from "@xolacekit/ui";

const FeedHeader = () => {


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>

                <View style={styles.actionRow}>
                   <View className={'flex flex-row items-center'}>
                       <DrawerToggleButton />

                       <Text className=' text-2xl font-bold'>Xolace</Text>
                   </View>

                    <View>
                        <Bell/>
                    </View>


                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 50,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: 16,
    },

    searchBtn: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        gap: 10,
        padding: 14,
        alignItems: 'center',
        width: 280,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#c2c2c2',
        borderRadius: 30,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#A2A0A2',
        borderRadius: 24,
    },
});

export default FeedHeader;
