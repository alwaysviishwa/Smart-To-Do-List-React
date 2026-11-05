const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";
const TASKS_KEY = "tasks";
 
// Demo Admin account for classroom review only.
// Do not use this method for a real production website.
export const ADMIN_ACCOUNT = {
  email: "admin@smarttodo.com",
  password: "Admin123!"
};
 
function readArray(key) {
  try {
    const savedValue = JSON.parse(localStorage.getItem(key));
    return Array.isArray(savedValue) ? savedValue : [];
  } catch (error) {
    return [];
  }
}
 
export function getUsers() {
  return readArray(USERS_KEY);
}
 
export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
 
export function getTasks() {
  return readArray(TASKS_KEY);
}
 
export function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}
 
export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
  } catch (error) {
    return null;
  }
}
 
export function saveCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}
 
export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}
