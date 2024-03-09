import { View, Text, Keyboard } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Animated, { BounceOutDown, SlideInDown } from "react-native-reanimated";

import { theme } from "@/theme";
import { styles } from "./styles";

import { Button } from "@/components/Button";

type Props = {
  quantity: number;
  onClear: () => void;
  onSearch: () => void;
};

export function Selected({ quantity, onClear, onSearch }: Props) {
  function checkQuantity() {
    if (quantity !== 1) return "s";
  }
  return (
    <Animated.View
      entering={SlideInDown.duration(500)}
      exiting={BounceOutDown}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.label}>
          {quantity} ingrediente{checkQuantity()} selecionado{checkQuantity()}
        </Text>

        <MaterialIcons
          name="close"
          size={24}
          color={theme.colors.gray_400}
          onPress={onClear}
        />
      </View>

      <Button title="Encontrar" onPress={onSearch} />
    </Animated.View>
  );
}
