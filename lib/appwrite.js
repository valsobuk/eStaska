import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.orgovan.aora",
  projectId: "67571a2d000377e99d90",
  databaseId: "67571e75001697c1ebb3",
  userCollectionId: "67571ea400214cf069e4",
  videoCollectionId: "67571ee90033a5e2782c",
  storageId: "6757206c000ae7e71a2f",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databses = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);

    const newUser = await databses.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      { accountId: newAccount.$id, email, username, avatar: avatarUrl }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}