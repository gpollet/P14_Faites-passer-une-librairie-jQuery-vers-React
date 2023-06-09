import * as Realm from "realm-web";

const app = new Realm.App({ id: import.meta.env.VITE_APP_ID });
const mongo = app.currentUser?.mongoClient("mongodb-atlas");
const dbName = mongo?.db("mock")

export const collectionListAll = async (collectionName:string) => {
  const collection = dbName?.collection(collectionName);
  return await collection?.find({})
}

export const createDocument = async (collectionName:string, data) => {
  const collection = dbName?.collection(collectionName);
  const result = await collection?.insertOne(data)
  console.log(result)
}