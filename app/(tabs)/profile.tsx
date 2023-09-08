import { Button, Pressable, StyleSheet, useColorScheme } from "react-native";
import { Image } from "expo-image";

import { Text, View, SafeAreaView } from "../../components/Themed";
import { useAuth } from "../../context/auth";

export default function Profile() {
  const { user, signOut } = useAuth();

  const currentTheme = useColorScheme();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {user?.photoURL ? (
          <Image
            source={{ uri: user.photoURL }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
              marginBottom: 10,
            }}
          />
        ) : (
          <Image
            source={require("../../assets/images/icon.png")}
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
              marginBottom: 10,
            }}
          />
        )}

        <Text style={{ marginBottom: 10 }}>
          Name: {user?.displayName || "unknown"}
        </Text>
        <Text style={{ marginBottom: 10 }}>Created at {user?.createdAt}</Text>
        <Text style={{ marginBottom: 10 }}>
          Last login at {user?.lastLoginAt}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Signed in with {user?.providerId}
        </Text>
        <Text style={{ marginBottom: 10 }}>E-mail: {user?.email}</Text>
        <Text style={{ marginBottom: 10 }}>User ID: {user?.uid}</Text>

        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? "gray"
                : currentTheme === "dark"
                ? "black"
                : "white",
            },
            styles.signOutButton,
          ]}
          onPress={() => {
            signOut();
          }}
        >
          <Text style={styles.signOutButtonLabel}>Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  signOutButton: {
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    paddingRight: 25,
    paddingLeft: 25,
  },
  signOutButtonLabel: {
    alignSelf: "center",
    margin: 10,
    fontWeight: "bold",
  },
});
