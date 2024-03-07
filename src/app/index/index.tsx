import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { styles } from "./styles";

import Ingredient from "@/components/Ingredient";

export default function Index() {
  const [selected, setSelected] = useState<string[]>([]);

  function handleToggleSelected(value: string) {
    if (selected.includes(value))
      return setSelected((state) => state.filter((item) => item !== value));
    return setSelected((state) => [...state, value]);
  }

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
        {Array.from({ length: 100 }).map((_, index) => (
          <Ingredient
            key={index}
            name="Maçã"
            image=""
            selected={selected.includes(String(index))}
            onPress={() => handleToggleSelected(String(index))}
          />
        ))}
      </ScrollView>
    </View>
  );
}
