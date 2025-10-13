import React, { FC } from 'react';

import { StyleSheet, View } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

import { OnboardingData } from '../../constants/onboarding-data';
import Dot from './Dot';

type PaginationProps = {
  data: OnboardingData[];
  x: SharedValue<number>;
  dotColor?: string;
  activeDotColor?: string;
  dotSize?: number;
  activeDotSize?: number;
  containerStyle?: object;
};

const Pagination: FC<PaginationProps> = ({
  data,
  x,
  dotColor = '#1995e3',
  activeDotSize = 10,
  dotSize = 10,
  containerStyle = {},
}) => {
  return (
    <View style={[styles.paginationContainer, containerStyle]}>
      {data.map((_, index) => {
        return (
          <Dot
            index={index}
            x={x}
            key={index}
            inactiveColor={dotColor}
            activeColor={_.activeDotColor}
            inactiveSize={dotSize}
            activeSize={activeDotSize}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
