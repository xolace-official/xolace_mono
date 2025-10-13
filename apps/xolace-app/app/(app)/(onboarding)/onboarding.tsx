import {View, StyleSheet, FlatList, ViewToken} from "react-native";
import {data, OnboardingData} from '../../../constants/onboarding-data'
import {useCallback, useRef} from "react";
import Animated, {useAnimatedRef, useAnimatedScrollHandler, useSharedValue} from "react-native-reanimated";
import RenderItem from "../../../components/onboarding/RenderItem";
import OnboardingButton from "../../../components/onboarding/onBoardingButton";
import OnboardingNavButton from "../../../components/onboarding/onBoardingNavButton";
import Pagination from "../../../components/onboarding/Pagination";
import { router } from 'expo-router';
import {ONBOARDING_VERSION , useAppStore} from "@xolacekit/state";
// import Pagination from "@/components/Pagination";
// import OnboardingButton from "@/components/OnboardingButton";

const Onboarding = () => {
    const completeOnboarding = useAppStore((s) => s.completeOnboarding);

    const scrollRef = useAnimatedRef<FlatList<OnboardingData>>()
    const x = useSharedValue(0);
    const scrollIndex = useSharedValue(0);

    const keyExtractor = useCallback((item:any, index: number) => index.toString(), [])

    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x;
        },
    })

    const onViewableItemChanges = useCallback(({viewableItems}: {viewableItems: ViewToken[]}) => {
        const firstVisibleItem = viewableItems[0];
        if(firstVisibleItem?.index !== null && firstVisibleItem?.index !== undefined) {
            scrollIndex.value = firstVisibleItem.index;
        }
    }, [])


    const viewabilityConfig = useRef({minimumViewTime: 300, viewAreaCoveragePercentThreshold: 10})

    const onFinish = () => {
        completeOnboarding(ONBOARDING_VERSION);
    }

    return (
        <View style={styles.container}>
            <Animated.FlatList
                ref={scrollRef}
                data={data}
                horizontal
                pagingEnabled
                bounces={false}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                keyExtractor={keyExtractor}
                renderItem={({item , index})=> (
                    <RenderItem index={index} item={item} x={x} key={index}/>
                )}
                onScroll={onScroll}
                onViewableItemsChanged={onViewableItemChanges}
                viewabilityConfig={viewabilityConfig.current}
            />

            <View style={styles.bottomView}>
                <OnboardingNavButton dataLength={data.length} scrollIndex={scrollIndex} scrollRef={scrollRef} x={x}/>

                <OnboardingButton dataLength={data.length} scrollIndex={scrollIndex} scrollRef={scrollRef} x={x} onFinish={onFinish}/>
            </View>

            <View style={styles.paginationView}>
                <Pagination data={data} x={x}/>
            </View>
        </View>
    );
};

export default Onboarding;


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    bottomView:{
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 30,
        paddingVertical: 30,
    },
    paginationView:{
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    }
})