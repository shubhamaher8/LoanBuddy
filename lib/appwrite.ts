import { Client, Account, Databases } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1") // Appwrite Cloud endpoint
      .setProject("67bf20e0001c654d6013"); // Your Project ID

export const account = new Account(client);
export const databases = new Databases(client);
