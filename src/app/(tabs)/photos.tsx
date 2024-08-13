import * as React from "react";
import { View, FlatList, Image, StyleSheet, Pressable } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";

export default function Photos() {
  const router = useRouter();
  const [photos, setPhotos] = React.useState<MediaLibrary.Asset[]>([]);

  React.useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotos() {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status === "granted") {
      const { assets } = await MediaLibrary.getAssetsAsync({
        first: 100, // Define quantas fotos você deseja carregar
        mediaType: MediaLibrary.MediaType.photo,
      });

      setPhotos(assets);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        numColumns={3} // Configura o número de colunas no grid
        renderItem={({ item }) => (
          <Pressable
            key={item.id}
            onPress={() => router.push({ pathname: `/photo/${item.id}`, params: { uri: item.uri } })}
            style={styles.photoContainer}
          >
            <Image source={{ uri: item.uri }} style={styles.photo} />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  photoContainer: {
    flex: 1, // O container ocupa igualmente o espaço disponível
    margin: 5, // Adiciona margem ao redor da imagem
  },
  photo: {
    width: "100%", // A imagem ocupa 100% do espaço disponível dentro do container
    height: 100, // Altura definida para as imagens
    borderRadius: 10,
  },
});
