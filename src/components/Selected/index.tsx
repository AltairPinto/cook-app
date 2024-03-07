import { Text, View } from "react-native";
import Animated, { SlideInDown, BounceOutDown } from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import { theme } from "@/theme";

interface SelectedProps {
  quantity: number;
  onClear: () => void;
  onSearch: () => void;
}

export function Selected({ quantity, onClear, onSearch }: SelectedProps) {
  function checkQuantity() {
    if (quantity !== 1) return "s";
    return;
  }
  return (
    <Animated.View
      style={styles.container}
      entering={BounceOutDown.duration(500)}
      exiting={SlideInDown}
    >
      <View style={styles.header}>
        <Text style={styles.label}>
          {quantity} ingrediente{checkQuantity()} selecionado{checkQuantity()}
        </Text>

        <MaterialIcons
          name="close"
          size={24}
          onPress={onClear}
          color={theme.colors.gray_400}
        />
      </View>
    </Animated.View>
  );
}
