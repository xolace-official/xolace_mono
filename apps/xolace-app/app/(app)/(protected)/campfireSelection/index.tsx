import {Pressable, View} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import  {Link} from 'expo-router';

//
import {Text, ArrowRight} from '@xolacekit/ui';
import {CampfireCardV1} from "@xolacekit/campfire";

import Memo from "../../../../components/icons/favicon";
import FluxWave from "../../../../components/icons/flux-wave";

const arr = [
    {
        name : "tech"
    },
    {
        name : "campfire",
    },
    {
        name : "campfire",
    },
    {
        name : "campfire",
    }
]


const CampfireSelection = () => {
    return (
        <SafeAreaView className=" flex-1 px-5 bg-[#353839]">

            <View className=" flex flex-row justify-center items-center gap-2 py-8 ">
                <View className="">
                    <Memo/>
                </View>
                <Text className={'text-white text-3xl font-medium'}>Join Campfire</Text>
            </View>

            <View className='h-[107px] bg-[#F5EFE6] flex flex-row justify-between items-center px-4 rounded-lg overflow-hidden'>
                <View className=''>
                    <Text className={'text-[16px] font-medium '}>Find Your Campfire</Text>
                    <Text className='text-xs'>Pick a space where voices like yours gather.</Text>
                    <Text className='text-xs'>You can join more later.</Text>
                </View>

                <View className=''>
                    <FluxWave/>
                </View>
            </View>

            <Text className='mt-5 text-white'>Start Here</Text>

            <View>
                {
                    arr.map((_, i) => (
                        <CampfireCardV1 key={i}/>
                    ))
                }
            </View>

            <View>
                <Text className='text-center text-white'>Not Sure?</Text>
                {/*<Link className='text-center text-white flex flex-row items-center' href='/'><Text>Explore All</Text> <ArrowRight size={15}/></Link>*/}
                <View className='flex items-center justify-center'>
                    <Link className='text-center' href="/" asChild>
                        <Pressable className='flex flex-row items-center gap-1'>
                            <Text className='text-white'>Explore All Campfires</Text>
                            <ArrowRight color='white' size={15}/>
                        </Pressable>
                    </Link>
                </View>
            </View>

            <Text className='mt-3 text-center text-white'>
                Pick at least one campfire to continue
            </Text>

        </SafeAreaView>
    );
};

export default CampfireSelection;