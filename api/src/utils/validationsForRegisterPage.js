import sanitizeHtml from "sanitize-html";

export function sanitizeUserInput({
  email = "",
  username = "",
  password = "",
}) {
  return {
    email: sanitizeHtml(email, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim(),
    username: sanitizeHtml(username, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim(),
    password: sanitizeHtml(password, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim(),
  };
}

export function validateUsername(username) {
  const regex = /^[A-Za-z0-9]*[A-Za-z]+[A-Za-z0-9]*$/;
  if (!regex.test(username))
    throw new Error(
      "Invalid username. Must contain letters, can include numbers, no spaces or special characters."
    );
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) throw new Error("Invalid email format");
}

export function validatePassword(password) {
  if (password.length < 6)
    throw new Error("Password must be at least 6 characters long");
}
