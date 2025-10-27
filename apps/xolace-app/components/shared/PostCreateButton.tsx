import { TouchableOpacity, StyleSheet} from "react-native";
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'
import {router} from 'expo-router';

import {MessageSquarePlus} from "@xolacekit/ui";

const PostCreateButton = () => {

    const handlePress = () => {
        impactAsync(ImpactFeedbackStyle.Light)
        router.push('/(app)/(protected)/post-creation')
    }


    return (
        <TouchableOpacity style={styles.button} onPress={handlePress} className=' left-[50%] bg-purple-500 rounded-2xl w-16 h-16 items-center justify-center'>
            <MessageSquarePlus/>
        </TouchableOpacity>
    );
};

export default PostCreateButton;


const styles = StyleSheet.create({
    button:{
        transform: [{translateX: -20}],
        boxShadow: '0px 4px 6px rgba(0,0,0,0.2)'
    }
})