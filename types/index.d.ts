export { UserProfile };

declare global {
  interface UserProfile {
    full_name: string | null;
    avatar: string | null;
    email: string;
  }
}
