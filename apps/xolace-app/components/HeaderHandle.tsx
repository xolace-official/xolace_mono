import { ReactNode, memo } from 'react';

import {
  BottomSheetHandle,
  BottomSheetHandleProps,
} from '@gorhom/bottom-sheet';
import { StyleSheet, Text } from 'react-native';

interface HeaderHandleProps extends BottomSheetHandleProps {
  children?: string | ReactNode | ReactNode[];
}

const HeaderHandleComponent = ({ children, ...rest }: HeaderHandleProps) => {
  return (
    <BottomSheetHandle
      style={styles.container}
      indicatorStyle={styles.indicator}
      {...rest}
    >
      {typeof children === 'string' ? (
        <>
          <Text style={styles.title}>{children}</Text>
          <Text>hmm</Text>
          <Text>damn</Text>
        </>
      ) : (
        children
      )}
    </BottomSheetHandle>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.075)',
    zIndex: 99999,
  },
  title: {
    marginTop: 16,
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  indicator: {
    height: 4,
    opacity: 0.5,
  },
});

export const HeaderHandle = memo(HeaderHandleComponent);
