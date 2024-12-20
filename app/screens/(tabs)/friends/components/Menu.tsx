import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { ComponentType, FC } from "react";

interface MenuProps {
  menuItems: string[];
  menuFunctions: (() => void)[];
}
const Menu: React.FC<MenuProps> = ({ menuItems, menuFunctions }) => {
  return (
    <View>
      <FlatList
        data={menuItems}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={menuFunctions[menuItems.indexOf(item)]}
          >
            <Text style={styles.name}>{item}</Text>
          </TouchableOpacity>
        )}
        style={styles.container}
      />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    width: 128,
  },
  itemContainer: {
    borderWidth: 1,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    color: "white",
  },
});
