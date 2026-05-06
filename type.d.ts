export interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    rating: number;
    total_copies: number;
    available_copies: number;
    description: string;
    color: string;
    cover: string;
    video: string;
    summary: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "USER" | "ADMIN";
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    role?: "USER" | "ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "USER" | "ADMIN";
  }
}
