
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password) => {
    const minLength = 8;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const symbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  
    if (
      password.length < minLength ||
      !uppercaseRegex.test(password) ||
      !lowercaseRegex.test(password) ||
      !symbolRegex.test(password)
    ) {
      return "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one symbol.";
    }
  
    return true;
  };
  