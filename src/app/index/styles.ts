import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: theme.fonts.size.heading.xl,
    lineHeight: 44,
    marginTop: 42,
    fontFamily: theme.fonts.family.bold,
  },
  subtitle: {
    fontFamily: theme.fonts.family.regular,
  },
  message: {
    fontSize: theme.fonts.size.body.md,
    fontFamily: theme.fonts.family.regular,
    marginTop: 12,
    marginBottom: 12,
    color: theme.colors.gray_400,
  },
  ingredients: {
    flexWrap: "wrap",
    flexDirection: "row",
    paddingBottom: 20,
    gap: 12,
  },
  textInput: {
    borderRadius: theme.borderRadius.md,
    fontFamily: theme.fonts.family.medium,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 18,
  },
});
