import { Tabs } from 'expo-router'
import React from 'react'
import { View, Text , Image} from 'react-native'

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

const TabBarIcon = ({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) => {
  return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}

const TabsLayout = () => {
  return (
    <>
    <Tabs>
        <Tabs.Screen
        name='home'
        options={
            {
                title:'Home',
                headerShown:false,
                tabBarIcon:({color, focused}) => (
                    <TabBarIcon 
                    name = {focused ? 'home' : 'home-outline'}
                    color = {color}
                    />
                ),
            }
        }
        />
        <Tabs.Screen 
        name = 'friends'
        options={
          {
          title:'Friends',
          headerShown:false,
        }
        }
        />
    </Tabs>
    </>
  )
}

export default TabsLayout
