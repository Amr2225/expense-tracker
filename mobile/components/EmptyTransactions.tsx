import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";

export default function EmptyTransactions() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name='receipt-outline' size={64} color={COLORS.textLight} />
      </View>
      <Text style={styles.title}>No Transactions Yet</Text>
      <Text style={styles.description}>
        Start tracking your expenses and income by adding your first transaction
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: "center",
    lineHeight: 24,
  },
});
