// appwrite.ts
import { Client, Databases } from 'appwrite';

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

// Initialize the Databases service
const databases = new Databases(client);

export { databases };