import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { COLORS } from "@/constants/Colors";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    />
  );
}
