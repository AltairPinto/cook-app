import { useState, useEffect } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";

import { styles } from "./styles";

import { Ingredient } from "@/components/Ingredient";
import { Selected } from "@/components/Selected";
import { services } from "@/services";

export default function Index() {
  const [selected, setSelected] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);

  function handleToggleSelected(value: string) {
    if (selected.includes(value))
      return setSelected((state) => state.filter((item) => item !== value));
    return setSelected((state) => [...state, value]);
  }

  function handleClear() {
    return Alert.alert("Limpar", "Deseja limpar tudo?", [
      {
        text: "Não",
        style: "cancel",
      },
      { text: "Sim", onPress: () => setSelected([]) },
    ]);
  }

  function handleSearch() {
    router.navigate("/recipes/");
  }

  useEffect(() => {
    services.ingredients.findAll().then(setIngredients);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Escolha {"\n"}
        <Text style={styles.subtitle}>os produtos</Text>
      </Text>

      <Text style={styles.message}>
        Descubra receitas baseadas nos produtos que você escolheu.
      </Text>

      <ScrollView
        contentContainerStyle={styles.ingredients}
        showsVerticalScrollIndicator={false}
      >
        {ingredients?.map(({ id, name, image }) => (
          <Ingredient
            key={id}
            name={name}
            image={`${services.storage.imagePath}/${image}`}
            selected={selected.includes(String(id))}
            onPress={() => handleToggleSelected(String(id))}
          />
        ))}
      </ScrollView>

      {selected.length > 0 && (
        <Selected
          quantity={selected.length}
          onClear={handleClear}
          onSearch={handleSearch}
        />
      )}
    </View>
  );
}
