import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  photo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 3,
  },
  initial: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 8,
  },
  contactName: {
    fontSize: 16,
    paddingLeft: 16,
    marginVertical: 4,
  },
});
