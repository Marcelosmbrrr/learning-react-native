import { StyleSheet } from "react-native";

import { theme } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray_100,
    borderRadius: 18,
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 7
  },
  input: {
    flex: 1,
  },
});
