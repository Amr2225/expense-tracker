import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import { styles } from "@/assets/styles/error.styles";

interface ErrorScreenProps {
  onRetry?: () => void;
  message?: string;
}

export default function ErrorScreen({
  onRetry,
  message = "Something went wrong",
}: ErrorScreenProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/error-icon.png")}
        style={styles.errorIcon}
        contentFit='contain'
      />
      <Text style={styles.errorTitle}>Oops!</Text>
      <Text style={styles.errorMessage}>{message}</Text>

      {onRetry && (
        <Pressable style={styles.retryButton} onPress={onRetry}>
          <Ionicons name='refresh' size={20} color={COLORS.white} />
          <Text style={styles.retryButtonText}>Try Again</Text>
        </Pressable>
      )}
    </View>
  );
}
