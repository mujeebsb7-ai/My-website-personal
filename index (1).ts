export interface AITool {
  id: string;
  name: string;
  logo: string;
  color: string;
  promptCount: number;
}

export interface Prompt {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  isFree: boolean;
  rating: number;
  reviews: number;
  sales: number;
  views: number;
  seller: {
    name: string;
    avatar: string;
    verified?: boolean;
  };
  tool: {
    name: string;
    logo: string;
  };
  category: string;
  description?: string;
  previewContent?: string;
  previewImages?: string[];
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  promptCount: number;
  color: string;
  bgColor: string;
}

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  rating: number;
  sales: number;
  prompts: number;
  topCategory: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; icon?: string }[];
}
