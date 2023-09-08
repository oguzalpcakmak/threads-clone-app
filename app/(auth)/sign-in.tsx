import { ReactNode, useState } from "react";
import { Text, View, TextInput } from "../../components/Themed";
import {
  Pressable,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
} from "react-native";

import { signIn } from "../../firebaseConfig";

import { Image } from "expo-image";

import LinkButton from "../../components/LinkButton";

export default function SignInScreen(): ReactNode {
  const currentTheme = useColorScheme();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = async () => {
    setLoading(true);
    const user = await signIn(email, password);
    if (!user) {
      setLoading(false);
      alert("E-mail or Password (or both) not correct.");
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
        <View style={styles.signInContainer}>
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
              styles.signInButton,
            ]}
            onPress={() => {
              handleSignIn();
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
                ...styles.signInButtonLabel,
              }}
            >
              Sign In
            </Text>
          </Pressable>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <View>
              <Text style={styles.orLabel}>or</Text>
              <LinkButton
                link="/(auth)/sign-up"
                title="Sign Up"
                buttonStyle={styles.signUpButton}
                titleStyle={styles.signUpButtonLabel}
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
  signInContainer: {
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
  signInButton: {
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
  },
  signInButtonLabel: { fontWeight: "bold", alignSelf: "center", margin: 10 },
  orLabel: {
    alignSelf: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  signUpButton: {
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
  },
  signUpButtonLabel: {
    alignSelf: "center",
    margin: 10,
    fontWeight: "bold",
  },
});
