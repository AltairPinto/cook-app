import { Suspense, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import { Recipe } from "@/components/Recipe";
import { Ingredients } from "@/components/Ingredients";
import { Loading } from "@/components/Loading";

import { services } from "@/services";
import { styles } from "./styles";

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

      <View style={styles.recipesContainer}>
        <Text style={styles.title}>Receitas</Text>

        <Suspense fallback={<Loading />}>
          {recipes.length ? (
            <FlatList
              data={recipes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Recipe
                  recipe={item}
                  onPressOut={() => router.navigate("/recipe/" + item.id)}
                />
              )}
              style={styles.recipes}
              contentContainerStyle={styles.recipesContent}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{ gap: 16 }}
              numColumns={2}
            />
          ) : (
            <Text>Nenhuma receita encontrada</Text>
          )}
        </Suspense>
      </View>
    </View>
  );
}
