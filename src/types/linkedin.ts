export interface LinkedInProfile {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  email?: string;
  picture?: string;
  locale?: string;
  // Extended fields from /v2/me (if available)
  headline?: string;
  location?: { name: string };
}
