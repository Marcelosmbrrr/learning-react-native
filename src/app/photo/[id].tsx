import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function Photo() {
  const router = useRouter();
  const { uri } = useLocalSearchParams(); // Recebe o URI da imagem

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {uri ? (
        <Image source={{ uri: uri as string }} style={styles.photo} />
      ) : (
        <Text>Nenhuma imagem selecionada</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  photo: {
    width: "100%",
    height: "80%", // Ajusta a altura para preencher a maior parte da tela
    resizeMode: "contain",
  },
});
