import { FlatList, Text, View } from "react-native";

import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Recipe } from "@/components/Recipe";
import { Ingredients } from "@/components/Ingredients";

export default function Recipes() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back"
          size={32}
          onPress={() => router.back()}
        />

        <Text style={styles.title}>Ingredientes</Text>
      </View>

      {/* <Ingredients ingredients={[]} /> */}

      <FlatList
        data={["1"]}
        keyExtractor={(item) => item}
        renderItem={() => (
          <Recipe
            recipe={{
              name: "Omelete",
              image:
                "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.3290300:1666046443/Omelete%20de%20espinafre.jpg?f=16x9&h=698&w=1280&$p$f$h$w=8ef7c44",
              minutes: 10,
            }}
          />
        )}
      />
    </View>
  );
}
