import { Client as Appwrite, Databases, Account } from 'appwrite';

const server = {
    endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT.toString(),
    project: import.meta.env.VITE_APPWRITE_PROJECT_ID.toString(),
};

const client = new Appwrite();
const account = new Account(client);
client.setEndpoint(server.endpoint).setProject(server.project);

const sdk = { account };
export { sdk, server };