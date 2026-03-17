import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1a0f0a",
          height: 70,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
      }}
    >
      <Tabs.Screen
        name="alarmes"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "#4CAF50" : "white", fontWeight: "bold" }}>
              Alarmes
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="cronometro"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "#4CAF50" : "white", fontWeight: "bold" }}>
              Cronômetro
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}