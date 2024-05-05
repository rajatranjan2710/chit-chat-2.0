function checkCookie(cookieName) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // Check if the cookie starts with the desired name
    if (cookie.startsWith(cookieName + "=")) {
      // If it does, return true
      return true;
    }
  }
  // If the cookie was not found, return false
  return false;
}
