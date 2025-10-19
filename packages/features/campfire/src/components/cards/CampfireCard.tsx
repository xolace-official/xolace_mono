import {View} from "react-native";
import {Text, XolaceButton, XolaceIconBadge, X} from "@xolacekit/ui";

export const CampfireCardV1 = () => {
    return (
        <View className='h-[83px] bg-[#E8DFCA] flex flex-row justify-between items-center rounded-lg px-4 mb-4'>
            <View className=' max-w-[80%]'>
                <Text className='text-lg font-medium'>x/campfire name</Text>
                <Text className='truncate text-wrap text-xs mb-1'>No one negative issues and related stories dfh</Text>
                <View className='flex flex-row items-center gap-2'>
                    <View>
                        <XolaceIconBadge leftIcon={X} iconSize={18} label={'Mental Growth'}/>
                    </View>
                    <Text className='text-xs font-normal'>13k campers</Text>
                </View>
            </View>
            <View className=''>
                <XolaceButton label='Join' className={'bg-blue-400'} />
            </View>
        </View>
    );
};