import Avatar from "@/components/ui/Avatar";
import Heading from "@/components/ui/Heading";
import TextCustom from "@/components/ui/Text";
import React, { useEffect, useState, useRef } from "react"; // Added useRef
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import SimcardIcon from "@/components/ui/icons/SimcardIcon";
import ChartIcon from "@/components/ui/icons/ChartIcon";
import SessionIcon from "@/components/ui/icons/TimerIcon";
import HotYogaIcon from "@/components/ui/icons/HotYogaIcon";
import { Redirect, router, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserStore } from "@/store/userStore";
import WorkoutIcon from "@/components/ui/icons/WorkoutIcon";
import NutritionIcon from "@/components/ui/icons/NutritionIcon";
import TimerLinearIcon from "@/components/ui/icons/TimerLinearIcon";
import { useMe } from "@/hooks/useAuth";
import * as ImagePicker from "expo-image-picker";
import ArrowSquareLeftIcon from "@/components/ui/icons/ArrowSquareLeftIcon";
import { useChangeAvatar, usePatchUser } from "@/hooks/useUsers";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Page() {
  const navigation = useNavigation();
  const { data: userData, isLoading } = useMe();

  const [cardPAN, setCardPAN] = useState("");

  const changeUser = useUserStore((state) => state.changeUser);
  const { patchUser, isLoading: isPatchLoading } = usePatchUser();

  useEffect(() => {
    if (userData) {
      setCardPAN(userData?.payload?.card_pan);
    }
  }, [userData]);

  const handleSave = async () => {
    const data = await patchUser({
      id: userData.payload.id,
      patchUser: {
        card_pan: cardPAN,
      },
    });

    if (data?.success) {
      changeUser({
        cardPAN,
      });
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <KeyboardAwareScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowSquareLeftIcon width={34} height={34} />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontWeight: 900,
              fontSize: 18,
              textTransform: "uppercase",
            }}
          >
            Sequrity
          </Text>
        </View>

        <View style={{ marginBottom: 12, marginTop: 12 }}>
          <Text
            style={{
              marginBottom: 4,
              marginLeft: 6,
              fontWeight: "bold",
            }}
          >
            Card PAN
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your card PAN"
            placeholderTextColor="#999999"
            value={cardPAN}
            onChangeText={setCardPAN}
            autoComplete="name"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          {isPatchLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Save
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#F6F6F6",
    padding: 14,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#000",
    padding: 14,
    paddingVertical: 18,
    borderRadius: 8,
    marginTop: 12,
  },
});
