import * as MediaLibrary from "expo-media-library"; // acesso à galeria
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

// largura da tela
const screenWidth = Dimensions.get("window").width;

// tamanho de cada imagem (3 por linha)
const imageSize = screenWidth / 3;

// tipo de uma foto
type Photo = {
  id: string;
  uri: string;
  creationTime: number;
};

// tipo da SectionList
type PhotoSection = {
  title: string;
  data: Photo[][];
};

export default function Index() {
  // estado de permissão
  const [permission, setPermission] = useState<boolean>(false);

  // fotos agrupadas por data
  const [groupedPhotos, setGroupedPhotos] = useState<PhotoSection[]>([]);

  // foto selecionada (abre no modal)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // roda ao iniciar o app
  useEffect(() => {
    requestPermission();
  }, []);

  // pede permissão ao usuário
  const requestPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    setPermission(status === "granted");
  };

  // carrega fotos da galeria
  const loadPhotos = async () => {
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: [MediaLibrary.MediaType.photo],
      first: 200,
      sortBy: [MediaLibrary.SortBy.creationTime]
    });

    const photos: Photo[] = media.assets.map(asset => ({
      id: asset.id,
      uri: asset.uri,
      creationTime: asset.creationTime
    }));

    const grouped = groupPhotosByDate(photos);
    setGroupedPhotos(grouped);
  };

  // carrega fotos quando tem permissão
  useEffect(() => {
    if (permission) {
      loadPhotos();
    }
  }, [permission]);

  // 🔥 FUNÇÃO CORRIGIDA (agora dentro do componente)
  const openPhoto = async (photo: Photo) => {
    try {
      const assetInfo = await MediaLibrary.getAssetInfoAsync(photo.id);

      // usa localUri (melhor compatibilidade)
      const uri = assetInfo.localUri || assetInfo.uri;

      if (!uri) {
        console.log("Imagem inválida:", photo.id);
        return;
      }

      setSelectedPhoto({
        ...photo,
        uri
      });
    } catch (error) {
      console.log("Erro ao abrir imagem:", error);
    }
  };

  // agrupa fotos por data
  const groupPhotosByDate = (photos: Photo[]) => {
    const groups: Record<string, Photo[]> = {};

    photos.forEach(photo => {
      const date = new Date(photo.creationTime);

      const formattedDate = date.toLocaleDateString("pt-BR", {
        weekday: "short",
        day: "numeric",
        month: "short"
      });

      if (!groups[formattedDate]) {
        groups[formattedDate] = [];
      }

      groups[formattedDate].push(photo);
    });

    return Object.keys(groups).map(date => {
      const rows: Photo[][] = [];

      for (let i = 0; i < groups[date].length; i += 3) {
        rows.push(groups[date].slice(i, i + 3));
      }

      return {
        title: date,
        data: rows
      };
    });
  };

  // data formatada da foto selecionada
  const selectedDate = selectedPhoto
    ? new Date(selectedPhoto.creationTime).toLocaleString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    : "";

  // tela sem permissão
  if (!permission) {
    return (
      <View style={styles.center}>
        <Text onPress={requestPermission}>
          Precisamos de acesso à galeria
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* LISTA DE FOTOS */}
      <SectionList
        sections={groupedPhotos}
        keyExtractor={(item) => item[0].id}
        renderSectionHeader={({ section }) => (
          <Text style={styles.date}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.row}>
            {item.map(photo => (
              <TouchableOpacity
                key={photo.id}
                onPress={() => openPhoto(photo)}
              >
                <Image
                  source={{ uri: photo.uri }}
                  style={styles.image}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      />

      {/* MODAL DA FOTO */}
      <Modal
        visible={selectedPhoto !== null}
        animationType="fade"
        transparent={false}
      >
        <View style={styles.viewer}>

          {/* TOPO */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => setSelectedPhoto(null)}>
              <Text style={styles.close}>←</Text>
            </TouchableOpacity>

            <Text style={styles.viewerDate}>
              {selectedDate}
            </Text>
          </View>

          {/* IMAGEM */}
          {selectedPhoto && (
            <Image
              source={{ uri: selectedPhoto.uri }}
              style={styles.viewerImage}
              resizeMode="contain"
            />
          )}

          {/* BARRA INFERIOR */}
          <View style={styles.bottomBar}>
            <Text style={styles.button}>Compartilhar</Text>
            <Text style={styles.button}>Editar</Text>
            <Text style={styles.button}>Adicionar</Text>
            <Text style={styles.button}>Lixeira</Text>
          </View>

        </View>
      </Modal>
    </View>
  );
}

// 🎨 ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  date: {
    color: "white",
    fontSize: 16,
    padding: 10
  },

  row: {
    flexDirection: "row"
  },

  image: {
    width: imageSize,
    height: imageSize
  },

  viewer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },

  viewerImage: {
    width: "100%",
    height: "80%",
    alignSelf: "center"
  },

  topBar: {
    position: "absolute",
    top: 40,
    left: 15,
    right: 15,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10
  },

  viewerDate: {
    color: "white",
    fontSize: 16,
    marginLeft: 10
  },

  close: {
    color: "white",
    fontSize: 28
  },

  bottomBar: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around"
  },

  button: {
    color: "white",
    fontSize: 16
  }
});