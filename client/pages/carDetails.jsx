import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SwipeUpDown from 'react-native-swipe-up-down';

const MiniItem = () => (
  <View>
    <Text>This is the mini item</Text>
  </View>
);

const FullItem = () => (
  <View>
    <Text>This is the full item</Text>
  </View>
);

const CarDetails = () => {
  const swipeUpDownRef = useRef(null);

  // Hide the drawer by default
  useEffect(() => {
    swipeUpDownRef.current.showMini();
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={() => swipeUpDownRef.current.showFull()}>
        <Text>Click me to open drawer</Text>
      </TouchableOpacity>
      <SwipeUpDown
        ref={swipeUpDownRef}
        itemMini={<MiniItem />}
        itemFull={<FullItem />}
        onShowMini={() => console.log('mini')}
        onShowFull={() => console.log('full')}
        animation="spring"
        disableSwipeIcon
        extraMarginTop={100}
        iconColor="yellow"
        iconSize={30}
        style={{ backgroundColor: '#000' }} // style for swipe
      />
    </View>
  );
};

export default CarDetails;
