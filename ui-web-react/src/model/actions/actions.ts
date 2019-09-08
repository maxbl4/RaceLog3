// Log in
export const LOG_IN = "LOG_IN";
export const AUTHENTICATE = "AUTH";

export function login(state: boolean) {
  return {
    type: LOG_IN,
    state: state
  };
}

export function authenticate(user: string, email: string, role: string) {
  return {
    user: user,
    email: email,
    role: role
  };
}
