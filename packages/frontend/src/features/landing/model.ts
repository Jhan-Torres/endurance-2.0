// Landing page specific types (frontend only)
export interface LandingContent {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  type: "hero" | "feature" | "testimonial";
}

export interface LandingState {
  content: LandingContent[];
  loading: boolean;
  isLoaded: boolean;
}
