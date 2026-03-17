import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Cronometro() {
  const [time, setTime] = useState(0); // tempo em ms
  const [running, setRunning] = useState(false); // rodando ou parado
  const [showReset, setShowReset] = useState(false); // mostrar botão reset

  const intervalRef = useRef<number | null>(null); // referência do setInterval

  // iniciar/parar cronômetro
  const startStop = () => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current); // limpa se houver
      setRunning(true);
      setShowReset(false);
      intervalRef.current = setInterval(() => setTime(prev => prev + 10), 10);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setRunning(false);
      setShowReset(true); // mostra reset depois de parar
    }
  };

  // reset cronômetro
  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTime(0);
    setRunning(false);
    setShowReset(false);
  };

  // formata tempo ss.mm
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${seconds < 10 ? "0" : ""}${seconds}.${milliseconds < 10 ? "0" : ""}${milliseconds}`;
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <Text style={styles.header}>Cronômetro</Text>

      {/* Tempo */}
      <Text style={styles.time}>{formatTime(time)}</Text>

      {/* Botão iniciar/parar */}
      <TouchableOpacity style={[styles.mainButton, { backgroundColor: running ? "#D32F2F" : "#4CAF50" }]} onPress={startStop}>
        <Text style={styles.mainText}>{running ? "Parar" : "Iniciar"}</Text>
      </TouchableOpacity>

      {/* Botão reset aparece após parar */}
      {showReset && (
        <TouchableOpacity style={styles.resetButton} onPress={reset}>
          <Text style={styles.resetText}>Redefinir</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a0f0a", alignItems: "center", justifyContent: "center", paddingTop: 50 },
  header: { alignSelf: "flex-start", fontSize: 24, color: "white", marginBottom: 20 },
  time: { fontSize: 100, color: "white", marginBottom: 50 },
  mainButton: { width: 120, height: 120, borderRadius: 60, justifyContent: "center", alignItems: "center", elevation: 5 },
  mainText: { color: "white", fontWeight: "bold", fontSize: 20 },
  resetButton: { marginTop: 20, backgroundColor: "#757575", paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20 },
  resetText: { color: "white", fontSize: 16, fontWeight: "bold" },
});