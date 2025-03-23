import { View, Text } from "react-native";
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from "react-native-toast-message";

interface CustomToastProps extends BaseToastProps {
  text1?: string;
  text2?: string;
}

const toastConfig = {
  error: ({ text1, text2 }: CustomToastProps) => (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 20,
        right: 20,
        backgroundColor: "#1f1f1f",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 7,
      }}
    >
      {text1 && (
        <Text style={{ color: "#fff", fontWeight: "bold" }}>{text1}</Text>
      )}
      {text2 && <Text style={{ color: "white" }}>{text2}</Text>}
    </View>
  ),
  success: ({ text1, text2 }: CustomToastProps) => (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 20,
        right: 20,
        backgroundColor: "#1f1f1f",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 7,
      }}
    >
      {text1 && (
        <Text style={{ color: "#fff", fontWeight: "bold" }}>{text1}</Text>
      )}
      {text2 && <Text style={{ color: "white" }}>{text2}</Text>}
    </View>
  ),
};

export default toastConfig;
