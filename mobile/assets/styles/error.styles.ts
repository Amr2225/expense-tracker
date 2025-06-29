import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
        backgroundColor: COLORS.background,
    },
    errorIcon: {
        width: 300,
        height: 300,
        marginBottom: 24,
    },
    errorTitle: {
        fontSize: 24,
        fontWeight: "600",
        color: COLORS.text,
        marginBottom: 12,
    },
    errorMessage: {
        fontSize: 16,
        color: COLORS.textLight,
        textAlign: "center",
        lineHeight: 24,
        marginBottom: 32,
    },
    retryButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 24,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    retryButtonText: {
        color: COLORS.white,
        fontWeight: "600",
        marginLeft: 8,
    },
}); 