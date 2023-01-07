import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeBottomBar from './HomeBottomBar';
import Lottie from 'lottie-react-native';
import Settings from '/features/Settings';
import { DASHBOARD, SETTINGS } from '../constants';

//set up routes
const Tab = createBottomTabNavigator();

// variable
const homeOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

const iconStyle = {
  height: 24,
  width: 24,
};

function HomeNavigation() {
  return (
    <Tab.Navigator
      screenOptions={homeOptions}
      initialRouteName={DASHBOARD}
      tabBar={(props) => <HomeBottomBar {...props} />}
    >
      <Tab.Screen
        name={SETTINGS}
        options={{
          // @ts-ignore
          tabBarIcon: ({ ref }) => (
            <Lottie
              ref={ref}
              loop={false}
              source={require('assets/lottie/settings.icon.json')}
              style={iconStyle}
              autoPlay={true}
            />
          ),
        }}
        component={Settings}
      />
    </Tab.Navigator>
  );
}

export default HomeNavigation;
