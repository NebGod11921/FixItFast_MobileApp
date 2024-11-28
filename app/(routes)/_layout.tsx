import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { LogBox } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import { Stack } from "expo-router";

export { ErrorBoundary } from "expo-router";

const RootLayout = () => {
  const [loaded, error] = useFonts({
    "outfit-bold": require("@/assets/fonts/Montserrat-Bold.ttf"),
    "outfit-medium": require("@/assets/fonts/Montserrat-Medium.ttf"),
    "outfit-regular": require("@/assets/fonts/Montserrat-Regular.ttf"),
    "outfit-semibold": require("@/assets/fonts/Montserrat-SemiBold.ttf"),
  });

  useEffect(() => {
    LogBox.ignoreAllLogs(true);
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <RootLayoutNav />;
};

function RootLayoutNav() {
  return (
    <ToastProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onBoardingRoute" />
        <Stack.Screen name="loginRoute" />
        <Stack.Screen name="registrationRoute" />
        <Stack.Screen name="resetPasswordRoute" />
        <Stack.Screen name="createNewPasswordRoute" />
        <Stack.Screen name="verifyCodeRoute" />
        <Stack.Screen name="discountRoute" />
        <Stack.Screen name="selectServiceRoute" />
        <Stack.Screen name="editProfileRoute" />
        <Stack.Screen name="addInfoMotoRoute" />
        <Stack.Screen name="becomMechanicRoute" />
        <Stack.Screen name="viewMechanicRoute" />
        <Stack.Screen name="addInfoMechanicRoute" />
        <Stack.Screen name="verifyCodeRegisRoute" />
        <Stack.Screen name="appointmentRoute" />
        <Stack.Screen name="createNewAppointmentRoute" />
        <Stack.Screen name="viewMoreAppointmentRoute"/>
        <Stack.Screen name="createAppointmentSOSRouter" />
      </Stack>
    </ToastProvider>
  );
}

export default RootLayout;
