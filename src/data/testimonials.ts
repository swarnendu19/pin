/**
 * Testimonials data store.
 *
 * TODO: Add real testimonials here once they are collected from verified customers.
 *
 * Structure for future testimonials:
 * {
 *   id: string;              // unique identifier
 *   quote: string;           // the testimonial text
 *   name: string;            // first name + last initial (e.g., "Sarah M.")
 *   descriptor: string;      // e.g., "Incoming Freshman, Ohio State"
 *   verified: boolean;       // true = verified purchase
 *   date: string;            // ISO date string
 * }
 *
 * IMPORTANT: Do NOT add fabricated testimonials.
 * Only add testimonials from real, verified customers.
 *
 * When the array contains items, the SocialProof component will
 * automatically switch from the "questions" view to showing testimonials.
 */

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  descriptor: string;
  verified: boolean;
  date: string;
}

export const testimonials: Testimonial[] = [
  // Real testimonials will go here after launch.
  // See documentation above for the expected shape.
];
