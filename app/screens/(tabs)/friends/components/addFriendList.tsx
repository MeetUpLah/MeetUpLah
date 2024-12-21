import firestore from "@react-native-firebase/firestore";
import checkUser from "./checkUser";

const addFriendList = async (uid: string, router: any, username: string) => {
  const currUserCollection = firestore().collection("users").doc(uid);
  const isUserInDB = await checkUser(uid, username);
  if (isUserInDB) {
    const dupsCheck = await currUserCollection
      .collection("friends")
      .doc(username)
      .get();
    if (dupsCheck.exists) {
      alert("friend already in friendlist");
    } else {
      currUserCollection
        .collection("friends")
        .doc(username)
        .set({ username: username, inFriendGroups: "" });
      router.back();
      alert("friend added into friendlist");
    }
  }
};

export default addFriendList;
