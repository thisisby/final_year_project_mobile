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

export default function Page() {
  const navigation = useNavigation();
  const { data: userData, isLoading } = useMe();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);

  const scrollViewRef = useRef();
  const usernameInputRef = useRef();
  const bioInputRef = useRef();
  const emailInputRef = useRef();

  const { changeAvatar, isLoading: isAvatarLoading } = useChangeAvatar();
  const { patchUser, isLoading: isPatchLoading } = usePatchUser();

  useEffect(() => {
    if (userData) {
      setEmail(userData?.payload.email);
      setUsername(userData?.payload.username);
      setBio(userData?.payload.bio);

      if (userData?.payload?.avatar) {
        setImage(userData.payload.avatar);
      }
    }
  }, [userData]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const avatar = {
          uri: result.assets[0].uri,
          name: `avatar-${Date.now()}.jpg`, // Unique filename
          type: "image/jpeg", // Adjust based on the actual image type
        };
        await changeAvatar(avatar);
        setImage(result.assets[0].uri);
      } catch (e) {
        alert("Upload failed");
      }
    }
  };

  const handleInputFocus = (ref) => {
    if (scrollViewRef.current && ref.current) {
      ref.current.measureLayout(
        scrollViewRef.current,
        (x, y, width, height) => {
          scrollViewRef.current.scrollTo({ y: y - 50, animated: true });
        },
        () => {}
      );
    }
  };

  const handleSave = async () => {
    await patchUser({
      id: userData.payload.id,
      patchUser: {
        username,
        bio,
        email,
      },
    });
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        ref={scrollViewRef} // Attach the ref to the ScrollView
        contentContainerStyle={{ paddingBottom: 130 }}
        style={styles.container}
      >
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
                <ArrowSquareLeftIcon width={30} height={30} />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontWeight: "800",
                fontSize: 20,
                marginBottom: 0,
              }}
            >
              General
            </Text>
          </View>

          <View style={{ marginBottom: 12, marginTop: 12 }}>
            <View style={{ marginBottom: 20 }}>
              <View
                style={{
                  display: "flex",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: 350,
                  }}
                >
                  <ImageBackground
                    source={{
                      uri:
                        image ||
                        "https://fyp-images-bucket.s3.us-west-2.amazonaws.com/avatar-1743004329677.jpg",
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 10,
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        padding: 10,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      }}
                      onPress={pickImage}
                    >
                      {isAvatarLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text style={{ color: "#fff" }}>
                          Change Profile Picture
                        </Text>
                      )}
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
              </View>
            </View>

            <Text
              style={{
                marginBottom: 4,
                marginLeft: 6,
                fontWeight: "bold",
              }}
            >
              Username
            </Text>
            <TextInput
              ref={usernameInputRef} // Attach ref
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#999999"
              value={username}
              onChangeText={setUsername}
              autoComplete="name"
              onFocus={() => handleInputFocus(usernameInputRef)}
            />
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                marginBottom: 4,
                marginLeft: 6,
                fontWeight: "bold",
              }}
            >
              Bio
            </Text>
            <TextInput
              ref={bioInputRef} // Attach ref
              style={styles.input}
              placeholder="Bio"
              placeholderTextColor="#999999"
              value={bio}
              onChangeText={setBio}
              autoComplete="name"
              multiline={true}
              numberOfLines={4}
              blurOnSubmit={true}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              onFocus={() => handleInputFocus(bioInputRef)}
            />
          </View>

          <View>
            <Text
              style={{
                marginBottom: 4,
                marginLeft: 6,
                fontWeight: "bold",
              }}
            >
              Email
            </Text>
            <TextInput
              ref={emailInputRef} // Attach ref
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#999999"
              value={email}
              onChangeText={setEmail}
              autoComplete="name"
              onFocus={() => handleInputFocus(emailInputRef)}
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
      </ScrollView>
    </KeyboardAvoidingView>
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
