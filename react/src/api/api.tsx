import * as Realm from "realm-web";
import { NewEmployeeData } from "../types";

// Connects to the database and retrieves the requested collection
const database = async (collectionName: string) => {
	// Initialize App
	const app = new Realm.App({ id: "hrnet-npxzf" });
	// Log in as an anonymous user
	const user = await app.logIn(Realm.Credentials.anonymous());
	const mongo = user.mongoClient("mongodb-atlas");
	const dbName = mongo.db("mock");
	return dbName?.collection(collectionName);
};

export const collectionListAll = async (collectionName: string) => {
	return (await database(collectionName)).find({});
};

export const createDocument = async (
	collectionName: string,
	data: NewEmployeeData
) => {
	await (await database(collectionName)).insertOne(data);
};
