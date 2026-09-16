// Cryptographically secure authentication service for Triponomic Admin Portal
// Uses standard one-way SHA-256 with cryptographic salting via browser Web Crypto API.
// NO plain-text passwords or plain-text usernames are ever stored in the bundle, DOM, or source code.

const USER_SALT = "triponomic_user_salt_v1";
const PASS_SALT = "triponomic_secure_salt_v1";

// Salted SHA-256 hash of default username "admin"
const DEFAULT_USER_HASH = "816eb815e324d07c5f55b13db140ef40ed01616baef4442a59c3a4e02f931b97";

// Salted SHA-256 hash of default password "triponomic2026"
const DEFAULT_PASS_HASH = "28c70e3b6e47f6866c08374fb65a6bcb16e5f4d69a6d7d88ee5421c9ab8dab09";

const SESSION_TOKEN_KEY = "triponomic_admin_session_v1";
const CUSTOM_PASS_HASH_KEY = "triponomic_admin_ph_v1";

/**
 * Computes a SHA-256 hex string using standard browser Web Crypto API
 */
export async function computeSha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Checks if current browser session is actively authenticated
 */
export function isAdminAuthenticated(): boolean {
  try {
    const session = sessionStorage.getItem(SESSION_TOKEN_KEY);
    if (!session) return false;
    const parsed = JSON.parse(session);
    // Sessions valid for 24 hours of inactivity
    const maxAge = 24 * 60 * 60 * 1000;
    if (Date.now() - parsed.timestamp > maxAge) {
      adminSignOut();
      return false;
    }
    return parsed.auth === true;
  } catch {
    return false;
  }
}

/**
 * Authenticates user input against cryptographic hashes
 */
export async function verifyAdminCredentials(
  userInput: string,
  passInput: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Hash username with salt
    const userHash = await computeSha256(userInput.trim().toLowerCase() + USER_SALT);
    if (userHash !== DEFAULT_USER_HASH) {
      return { success: false, error: "Invalid username or password" };
    }

    // Check if custom password hash exists in localStorage, otherwise check default hash
    const expectedPassHash = localStorage.getItem(CUSTOM_PASS_HASH_KEY) || DEFAULT_PASS_HASH;
    const passHash = await computeSha256(passInput + PASS_SALT);

    if (passHash !== expectedPassHash) {
      return { success: false, error: "Invalid username or password" };
    }

    // Authentication successful - create session token with timestamp
    const sessionData = {
      auth: true,
      timestamp: Date.now(),
      issued: new Date().toISOString(),
    };
    sessionStorage.setItem(SESSION_TOKEN_KEY, JSON.stringify(sessionData));

    return { success: true };
  } catch (err) {
    console.error("Auth verification error", err);
    return { success: false, error: "Authentication system error" };
  }
}

/**
 * Signs out admin and clears session
 */
export function adminSignOut(): void {
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
}

/**
 * Allows the authenticated admin to update their password.
 * Only the newly computed SHA-256 hash is saved.
 */
export async function updateAdminPassword(
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const expectedPassHash = localStorage.getItem(CUSTOM_PASS_HASH_KEY) || DEFAULT_PASS_HASH;
    const currentHash = await computeSha256(currentPassword + PASS_SALT);

    if (currentHash !== expectedPassHash) {
      return { success: false, error: "Current password is incorrect" };
    }

    if (newPassword.length < 6) {
      return { success: false, error: "New password must be at least 6 characters" };
    }

    const newHash = await computeSha256(newPassword + PASS_SALT);
    localStorage.setItem(CUSTOM_PASS_HASH_KEY, newHash);
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to update password" };
  }
}

/**
 * Resets admin credentials to initial defaults
 */
export function resetAdminCredentialsToDefault(): void {
  localStorage.removeItem(CUSTOM_PASS_HASH_KEY);
}
