import { FlatList, Pressable, Text, View, Alert, RefreshControl } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

// Components
import PageLoader from "@/components/PageLoader";
import { SignOutButton } from "@/components/SignOutButton";
import BalanceCard from "@/components/BalanceCard";
import { TransactoinCard } from "@/components/TransactoinCard";
import EmptyTransactions from "@/components/EmptyTransactions";

import { useUser } from "@clerk/clerk-expo";
import { useTransactions } from "@/hooks/useTransactions";
import { styles } from "@/assets/styles/home.styles";
import { COLORS } from "@/constants/Colors";
import ErrorScreen from "@/components/ErrorScreen";

export default function Page() {
  const { user } = useUser();

  const { transactions, summary, deleteTransactionMutation, isHomeLoading } = useTransactions(
    user?.id!
  );

  if (isHomeLoading) {
    return <PageLoader />;
  }

  if (transactions.error) {
    return (
      <ErrorScreen
        onRetry={() => {
          transactions.refetch();
          summary.refetch();
        }}
      />
    );
  }

  const handleDeleteTransaction = (transactionId: string) => {
    Alert.alert("Delete Transaction", "Are you sure you want to delete this transaction?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTransactionMutation.mutate(transactionId),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          {/* HEADER LEFT */}
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              contentFit='contain'
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0].emailAddress.split("@")[0]}
              </Text>
            </View>
          </View>

          {/* HEADER RIGHT */}
          <View style={styles.headerRight}>
            <Pressable
              style={[styles.addButton, { overflow: "hidden" }]}
              onPress={() => router.push("/create")}
              android_ripple={{ color: COLORS.primary, borderless: true, foreground: true }}
            >
              <Ionicons name='add' size={24} color={COLORS.white} />
              <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
            <SignOutButton />
          </View>
        </View>

        <BalanceCard summary={summary.data?.[0]!} />
      </View>

      <FlatList
        data={transactions.data}
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        renderItem={({ item }) => (
          <TransactoinCard transaction={item} deleteTransaction={handleDeleteTransaction} />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<EmptyTransactions />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isHomeLoading}
            onRefresh={() => {
              transactions.refetch();
              summary.refetch();
            }}
          />
        }
      />
    </View>
  );
}
