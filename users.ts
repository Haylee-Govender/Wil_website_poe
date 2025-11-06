import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string; // In a real app, this would be a securely hashed password.
}

const USERS_STORAGE_KEY = '@users_data';

// In-memory user store. This will reset on app reload.
let users: User[] = [];

// Function to load users from storage
const loadUsers = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USERS_STORAGE_KEY);
    users = jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to load users from storage', e);
    users = [];
  }
};

// Load users when the module is first imported.
loadUsers();

// Function to save users to storage
const saveUsers = async () => {
  try {
    const jsonValue = JSON.stringify(users);
    await AsyncStorage.setItem(USERS_STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save users to storage', e);
  }
};

export const addUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const newUser = { ...user, id: Date.now().toString() };
  users.push(newUser);
  await saveUsers();
  console.log('User Added:', newUser); // For debugging
  return newUser;
};

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  await loadUsers(); // Ensure we have the latest user list
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};