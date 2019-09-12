// Log in
export const LOG_IN = "LOG_IN";
export const AUTHENTICATE = "AUTH";

// News
export const NEWS_REQUESTED = "NEWS_REQUESTED";
export const NEWS_LOADED = "NEWS_LOADED";

// Races
export const RACES_REQUESTED = "RACES_REQUESTED";
export const RACES_LOADED = "RACES_LOADED";

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
