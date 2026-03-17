import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { FlatList, Platform, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

type Alarm = { id: string; time: string; enabled: boolean };

export default function Alarmes() {
  const [alarms, setAlarms] = useState<Alarm[]>([{ id: "1", time: "05:05", enabled: false }]);
  const [showPicker, setShowPicker] = useState(false);
  const [newAlarmTime, setNewAlarmTime] = useState(new Date());

  const toggleAlarm = (id: string) => {
    setAlarms(prev =>
      prev.map(alarm => (alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm))
    );
  };

  const addAlarm = () => setShowPicker(true);

  const onTimeSelected = (event: any, selectedTime?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, "0");
      const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
      const newId = (alarms.length + 1).toString();
      setAlarms([...alarms, { id: newId, time: `${hours}:${minutes}`, enabled: false }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alarmes</Text>
      <FlatList
        data={alarms}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.alarmItem, { backgroundColor: item.enabled ? "#7B5E57" : "#2a140d" }]}>
            <Text style={styles.time}>{item.time}</Text>
            <Switch value={item.enabled} onValueChange={() => toggleAlarm(item.id)} />
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={addAlarm}>
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={newAlarmTime}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={onTimeSelected}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a0f0a", padding: 20 },
  header: { fontSize: 24, color: "white", alignSelf: "flex-end", marginBottom: 20 },
  alarmItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20, borderRadius: 20, marginBottom: 15 },
  time: { fontSize: 40, color: "white" },
  addButton: { position: "absolute", bottom: 30, right: 30, backgroundColor: "#4CAF50", width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center", elevation: 5 },
  addText: { color: "white", fontSize: 40, lineHeight: 42 },
});