export function getUserId(): number {
  const id = Number(localStorage.getItem('userId'));

  if(isNaN(id)) {
    throw new Error('Cannot get user id from local storage');
  }

  return id;
}
