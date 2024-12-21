import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";

const checkUser = async (currUid: string, username: string) => {
  const usersDB = await firestore().collection("users").get();
  const curruser = await firestore().collection("users").doc(currUid).get();

  if (!curruser.exists) {
    Alert.alert("Error", "Current user does not exist.");
    return false;
  }

  let isUserInDB = false;
  let isCurrUser = false;

  for (const doc of usersDB.docs) {
    const data = doc.data();

    if (data.username === curruser.data()?.username) {
      isCurrUser = true;
      break;
    }

    // Check if the user exists in the database
    if (data.username === username) {
      isUserInDB = true;
      console.log(`${username} is in the database`);
      break; // Exit the loop once we find the user
    }
  }

  if (isCurrUser) {
    Alert.alert("You cant add yourself");
  } else if (!isUserInDB) {
    Alert.alert("User not in Database");
  }

  console.log("isUserInDB =", isUserInDB);
  return isUserInDB;
};

export default checkUser;
