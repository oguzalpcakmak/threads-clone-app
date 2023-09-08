import { Link } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { Text } from "./Themed";
import { useState, ReactNode } from "react";

// Define a union type for the possible types of `link`
type LinkType =
  | string
  | /* Add the appropriate type if available in your project */ any;

interface LinkButtonProps {
  link: LinkType;
  title: string;
  buttonStyle?: object;
  titleStyle?: object;
}

export default function LinkButton({
  link,
  title,
  buttonStyle,
  titleStyle,
}: LinkButtonProps): ReactNode {
  const currentTheme = useColorScheme();

  const [pressed, setPressed] = useState<boolean>(false);

  return (
    <Link href={link} asChild>
      <Pressable
        onPressIn={() => {
          setPressed(true);
        }}
        onPressOut={() => {
          setPressed(false);
        }}
        style={{
          backgroundColor: pressed
            ? "gray"
            : currentTheme === "dark"
            ? "black"
            : "white",
          ...(buttonStyle || {}),
        }}
      >
        <Text style={titleStyle}>{title}</Text>
      </Pressable>
    </Link>
  );
}
