export const USER_ID_LOCAL_STORAGE_KEY = 'userId';
export const TOKEN_LOCAL_STORAGE_KEY = 'access_token';

export function removeCredentialItems() {
  localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
  localStorage.removeItem(USER_ID_LOCAL_STORAGE_KEY);
}

export function saveCredentialItems(token: string, userId: number) {
  localStorage.setItem('access_token', token);
  localStorage.setItem('userId', userId.toString());
}

function getUserIdFromLocalStorage(): number {
  return Number(localStorage.getItem(USER_ID_LOCAL_STORAGE_KEY));
}

function isUserIdExists(): boolean {
  return isNaN(getUserIdFromLocalStorage());
}

export function getUserId(): number {
  if(isUserIdExists()) {
    throw new Error('Cannot get user id from local storage');
  }

  return getUserIdFromLocalStorage();
}

export function isLoggedIn() {
  return !isUserIdExists();
}

