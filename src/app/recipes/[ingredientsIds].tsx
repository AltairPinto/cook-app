import { FlatList, Text, View } from "react-native";

import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import { Recipe } from "@/components/Recipe";
import { Ingredients } from "@/components/Ingredients";
import { useEffect, useState } from "react";
import { services } from "@/services";

export default function Recipes() {
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);
  const [recipes, setRecipes] = useState<RecipeResponse[]>([]);

  const params = useLocalSearchParams<{ ingredientsIds: string }>();
  const ingredientsIdsList = params.ingredientsIds.split(";");

  useEffect(() => {
    services.ingredients.findByIds(ingredientsIdsList).then(setIngredients);
  }, []);
  useEffect(() => {
    services.recipes.findByIngredientsIds(ingredientsIdsList).then(setRecipes);
  });

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

      <Ingredients ingredients={ingredients} />

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Recipe recipe={item} />}
        style={styles.recipes}
        contentContainerStyle={styles.recipesContent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 16 }}
        numColumns={2}
      />
    </View>
  );
}
