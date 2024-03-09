import React, { useState, useEffect, Suspense } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";

import { Ingredient } from "@/components/Ingredient";
import { Selected } from "@/components/Selected";
import { Loading } from "@/components/Loading";

import { services } from "@/services";
import { styles } from "./styles";

export default function Index() {
  const [selected, setSelected] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [allItems, setAllItems] = useState<IngredientResponse[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

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
    router.navigate("/recipes/" + selected);
  }

  function handleFilteredItems(value: string) {
    setSearchText(value);
    if (!value) return setIngredients(allItems);
    setTimeout(() => {
      setIngredients(
        allItems.filter((ingredient) =>
          ingredient.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }, 500);
  }

  useEffect(() => {
    services.ingredients.findAll().then((items) => {
      setAllItems(items);
      setIngredients(items);
    });
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

      <Suspense fallback={<Loading />}>
        <View>
          <TextInput
            style={styles.textInput}
            value={searchText}
            onChangeText={handleFilteredItems}
            placeholder="Filtrar por ingrediente..."
            onFocus={() => setIsSearching(true)}
            onBlur={() => setIsSearching(false)}
          />

          <Animated.ScrollView
            contentContainerStyle={styles.ingredients}
            showsVerticalScrollIndicator={false}
            entering={FadeInDown}
          >
            {ingredients.length ? (
              ingredients.map(({ id, name, image }) => (
                <Ingredient
                  key={id}
                  name={name}
                  image={`${services.storage.imagePath}/${image}`}
                  selected={selected.includes(String(id))}
                  onPress={() => handleToggleSelected(String(id))}
                />
              ))
            ) : (
              <Text>Nenhum produto encontrado</Text>
            )}
          </Animated.ScrollView>
        </View>
      </Suspense>
      {selected.length > 0 && !isSearching && (
        <Selected
          quantity={selected.length}
          onClear={handleClear}
          onSearch={handleSearch}
        />
      )}
    </View>
  );
}
