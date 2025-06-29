import { useMemo } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Transaction } from "@/types/transacation.type";
import { styles } from "@/assets/styles/home.styles";
import { COLORS } from "@/constants/Colors";

import moment from "moment";

const CATEGORY_ICONS = {
  "Food & Drinks": "fast-food",
  Shopping: "shopping-cart",
  Transportation: "car",
  Entertainment: "movie",
  Bills: "receipt",
  Income: "cash",
  Other: "ellipsis-horizontal",
};

interface TransactoinCardProps {
  transaction: Transaction;
  deleteTransaction: (transactionId: string) => void;
}

export function TransactoinCard({ transaction, deleteTransaction }: TransactoinCardProps) {
  const isIncome = parseFloat(transaction.amount) > 0;
  const iconName = useMemo(
    () => CATEGORY_ICONS[transaction.category as keyof typeof CATEGORY_ICONS] || "pricetag-outline",
    [transaction.category]
  );

  return (
    <View style={styles.transactionCard}>
      <TouchableOpacity style={styles.transactionCard}>
        <View style={styles.categoryIconContainer}>
          <Ionicons name={iconName as any} size={24} color={COLORS.primary} />
        </View>

        <View style={styles.transactionsList}>
          <Text style={styles.transactionTitle}>{transaction.title}</Text>
          <Text style={styles.transactionCategory}>{transaction.category}</Text>
        </View>

        <View style={styles.transactionRight}>
          <Text
            style={[styles.transactionAmount, { color: isIncome ? COLORS.income : COLORS.expense }]}
          >
            {isIncome ? "+" : "-"}${Math.abs(parseFloat(transaction.amount)).toFixed(2)}
          </Text>
          <Text style={styles.transactionDate}>
            {moment(transaction.createdAt).format("MMM D, YYYY")}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTransaction(transaction.id)}
      >
        <Ionicons name='trash-outline' size={20} color={COLORS.expense} />
      </TouchableOpacity>
    </View>
  );
}
