import { useEffect } from "react";
import { FIREBASE_DB } from "~data";
import { doc, getDoc } from "firebase/firestore";
import { User } from "~types";
import { useAtom, useSetAtom } from "jotai";
import { authFlowAtom, isAppReadyAtom, isUserOnboardedAtom, userAtom } from "~state";
import { getData, storeData } from "~utils";
import { ASYNC_STORAGE_KEYS } from "~constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuth = () => {
  const [, setUser] = useAtom(userAtom);
  const [, setAuthFlow] = useAtom(authFlowAtom);
  const [isAppReady, setIsAppReady] = useAtom(isAppReadyAtom);
  const [isUserOnboarded, setIsUserOnboarded] = useAtom(isUserOnboardedAtom);

  useEffect(() => {
    let isMounted = true;

    async function getOnboardingFromStorage() {
      try {
        const onboarding = await getData(ASYNC_STORAGE_KEYS.ONBOARDED);
        const userId = await getData(ASYNC_STORAGE_KEYS.USER_UUID);

        if (onboarding) {
          // await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.PUSH_TOKEN);
          // await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.USER_ID);
          // await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.USER_UUID);
          // await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.USER);
          // await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.ONBOARDED);
          setIsUserOnboarded(true);
          if (userId) {
            const dataDocumentSnapshot = await getDoc(doc(FIREBASE_DB, "users", userId));
            if (dataDocumentSnapshot.exists()) {
              // await storeData(ASYNC_STORAGE_KEYS.USER, JSON.stringify(dataDocumentSnapshot.data()))
              setUser(dataDocumentSnapshot.data() as User);
            }
          }
          // else {
          //   setUser(null)
          //   setAuthFlow('register')
          // }
        } else {
          setIsUserOnboarded(false);
          setAuthFlow("register");
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (isMounted) {
      getOnboardingFromStorage().then(() => {
        setIsAppReady(true);
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return { isAppReady, isUserOnboarded };
};
