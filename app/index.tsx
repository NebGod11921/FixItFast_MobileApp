import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStore from "@/src/configs/services/store/store";

export default function Index() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const userData = useStore((state) => state.userData);


  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (isMounted) {
          setisLoggedIn(!!accessToken || !!userData);
        }
      } catch (error) {
        console.log(
          "Failed to retrieve access token from async storage",
          error
        );
      } finally {
        if (isMounted) {
          setisLoading(false);
        }
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, [userData]);

  if (isLoading) {
    return null;
  }

  return (
    <Redirect
      href={!isLoggedIn ? "/(routes)/onBoardingRoute" : "/(tabs)/home"}
    />
  );
}
