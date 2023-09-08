import {
  StyleSheet,
  ScrollView,
  Platform,
  RefreshControl,
  Pressable,
  useColorScheme,
} from "react-native";
import Lottie from "lottie-react-native";
import { useContext, useRef } from "react";
import { ThreadsContext } from "../../context/threads-context";
import ThreadsItem from "../../components/ThreadsItem";
import { View, SafeAreaView } from "../../components/Themed";
import { Link } from "expo-router";
import { Thread } from "../../types/threads";

export default function HomeScreen() {
  const animationRef = useRef<Lottie>(null);
  const threads = useContext(ThreadsContext);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: Platform.select({ android: 30 }),
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            tintColor={"transparent"}
            onRefresh={() => {
              animationRef.current?.play();
            }}
          />
        }
      >
        <View style={styles.centeredView}>
          <View style={styles.centeredView}>
            <Lottie
              ref={animationRef}
              source={require("../../lottie-animation/threads.json")}
              loop={false}
              style={styles.lottieContainer}
              autoPlay
            />
          </View>
        </View>
        {threads.map((thread: Thread) => (
          <View key={thread.id}>
            <Link
              href={{
                pathname: "/(tabs)/details/",
                params: { thread: JSON.stringify(thread) },
              }}
              asChild
            >
              <Pressable>
                {({ pressed }) => (
                  <ThreadsItem thread={thread} pressed={pressed} />
                )}
              </Pressable>
            </Link>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  lottieContainer: {
    width: 90,
    height: 90,
    alignSelf: "center",
  },
  centeredView: {
    flex: 1, // Occupy all available space within the container
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
  },
});
