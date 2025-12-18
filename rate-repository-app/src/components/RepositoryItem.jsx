import { Image, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 10,
  },
  topRow: {
    flexDirection: "row",
    gap: 15,
  },
  avatar: {
    width: 50,
    height: 50,
  },
  info: {
    gap: 5,
  },
  language: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 3,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowItem: {
    alignItems: "center",
    gap: 5,
  },
});

const formatCount = (value) =>
  value < 1000
    ? String(value)
    : `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`;

const RowItem = ({ value, label }) => (
  <View style={styles.rowItem}>
    <Text fontWeight="bold">{formatCount(value)}</Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.info}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <View style={styles.language}>
            <Text color="appBarText">{item.language}</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <RowItem value={item.stargazersCount} label="Stars" />
        <RowItem value={item.forksCount} label="Forks" />
        <RowItem value={item.reviewCount} label="Reviews" />
        <RowItem value={item.ratingAverage} label="Rating" />
      </View>
    </View>
  );
};

export default RepositoryItem;
