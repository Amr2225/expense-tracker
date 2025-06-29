import { View, Text, Alert, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { CATEGORIES } from "@/constants/Categories";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useTransactions } from "@/hooks/useTransactions";
import { styles } from "@/assets/styles/create.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";

export default function CreateTransactionPage() {
  const { user } = useUser();

  const router = useRouter();
  const { createTransactionMutation } = useTransactions(user?.id!);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [isExpense, setIsExpense] = useState(false);

  const handleCreateTransaction = () => {
    if (!title.trim()) return Alert.alert("Error", "Title is required");
    if (!amount.trim() || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0)
      return Alert.alert("Error", "Amount is required");

    if (!selectedCategory) return Alert.alert("Error", "Please select a category");

    createTransactionMutation.mutate(
      {
        user_id: user?.id!,
        title,
        amount: isExpense
          ? `-${Math.abs(parseFloat(amount)).toFixed(2)}`
          : Math.abs(parseFloat(amount)).toFixed(2),

        category: selectedCategory,
      },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Transaction</Text>

        <TouchableOpacity
          style={[
            styles.saveButtonContainer,
            (!title.trim() || createTransactionMutation.isPending) && styles.saveButtonDisabled,
          ]}
          onPress={handleCreateTransaction}
          disabled={!title.trim() || createTransactionMutation.isPending}
        >
          <Text style={styles.saveButton}>
            {createTransactionMutation.isPending ? "Saving..." : "Save"}
          </Text>

          {!createTransactionMutation.isPending && (
            <Ionicons name='checkmark' size={18} color={COLORS.primary} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.typeSelector}>
          {/* Expense Selector */}
          <TouchableOpacity
            style={[styles.typeButton, isExpense && styles.typeButtonActive]}
            onPress={() => setIsExpense(true)}
          >
            <Ionicons
              name='arrow-up-circle'
              size={22}
              color={isExpense ? COLORS.white : COLORS.expense}
              style={styles.typeIcon}
            />
            <Text style={[styles.typeButtonText, isExpense && styles.typeButtonTextActive]}>
              Expense
            </Text>
          </TouchableOpacity>

          {/* Income Selector */}
          <TouchableOpacity
            style={[styles.typeButton, !isExpense && styles.typeButtonActive]}
            onPress={() => setIsExpense(false)}
          >
            <Ionicons
              name='arrow-up-circle'
              size={22}
              color={!isExpense ? COLORS.white : COLORS.income}
              style={styles.typeIcon}
            />
            <Text style={[styles.typeButtonText, !isExpense && styles.typeButtonTextActive]}>
              Income
            </Text>
          </TouchableOpacity>
        </View>

        {/* Amount Container */}
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>E£</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            placeholder='0.00'
            keyboardType='numeric'
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name='create-outline'
            size={22}
            color={COLORS.textLight}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder='Transaction Title'
            placeholderTextColor={COLORS.textLight}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <Text style={styles.sectionTitle}>
          <Ionicons name='pricetags-outline' size={22} color={COLORS.textLight} />
        </Text>

        <View style={styles.categoryGrid}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.name && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <Ionicons
                name={category.icon as any}
                size={24}
                color={selectedCategory === category.name ? COLORS.white : COLORS.text}
                style={styles.categoryIcon}
              />
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category.name && styles.categoryButtonTextActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {createTransactionMutation.isPending && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color={COLORS.primary} />
        </View>
      )}
    </View>
  );
}
