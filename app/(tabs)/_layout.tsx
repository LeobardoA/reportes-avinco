import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export const unstable_settings = {
  initialRouteName: '(aservices)'
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      backBehavior='initialRoute'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="(clientes)"
        options={{
          title: 'Clientes',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(aservices)"
        options={{
          title: 'Servicios',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'clipboard' : 'clipboard-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(tools)"
        options={{
          title: 'Herramientas',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'build' : 'build-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
