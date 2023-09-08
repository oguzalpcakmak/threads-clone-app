import { ReactNode, useState } from "react";
import {
  Pressable,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { View, Text, TextInput } from "../../components/Themed";
import { Image } from "expo-image";
import { signUp } from "../../firebaseConfig";
import LinkButton from "../../components/LinkButton";

export default function SignUpScreen(): ReactNode {
  const currentTheme = useColorScheme();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async () => {
    setLoading(true);
    const user = await signUp(email, password);
    if (!user) {
      setLoading(false);
      alert("Error");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/icon.png")}
        style={{ width: 100, height: 100, marginBottom: 10, borderRadius: 50 }}
      />
      <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 30 }}>
        A-Z App
      </Text>
      <View>
        <View style={styles.signUpContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>E-mail</Text>
            <TextInput
              style={styles.inputBox}
              onChangeText={(e) => {
                setEmail(e);
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.inputBox}
              secureTextEntry={true}
              onChangeText={(e) => {
                setPassword(e);
              }}
            />
          </View>
          <Pressable
            disabled={email === "" || password === "" ? true : false}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? "gray"
                  : currentTheme === "dark"
                  ? "black"
                  : "white",
              },
              styles.signUpButton,
            ]}
            onPress={() => {
              handleSignUp();
            }}
          >
            <Text
              style={{
                color:
                  email === "" || password === ""
                    ? "gray"
                    : currentTheme === "dark"
                    ? "white"
                    : "black",
                ...styles.signUpButtonLabel,
              }}
            >
              Sign Up
            </Text>
          </Pressable>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <View>
              <Text style={styles.orLabel}>or</Text>
              <LinkButton
                link="/(auth)/sign-in"
                title="Sign In"
                buttonStyle={styles.signInButton}
                titleStyle={styles.signInButtonLabel}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  signUpContainer: {
    width: 250,
    padding: 5,
  },
  inputContainer: { margin: 5 },
  inputLabel: { marginBottom: 10, fontWeight: "bold" },
  inputBox: {
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
    margin: 5,
    padding: 10,
  },
  signUpButton: {
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
  },
  signUpButtonLabel: { fontWeight: "bold", alignSelf: "center", margin: 10 },
  orLabel: {
    alignSelf: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  signInButton: {
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
  },
  signInButtonLabel: {
    alignSelf: "center",
    margin: 10,
    fontWeight: "bold",
  },
});
