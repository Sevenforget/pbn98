// API 응답 타입 정의
export interface ApiPostResponse {
  id: number;
  community_id: number;
  community_url: string;
  title: string;
  content: string;
  summary: string;
  author_name: string;
  status: string;
  post_date: string;
  target_url: string;
  keywords: string[];
  campaign_id: number;
  meta_title: string;
  meta_description: string;
  tags: string;
  view_count: number;
  created_at: string;
  updated_at: string;
  community_name: string;
  campaign_name: string;
}

// 기존 프로젝트에서 사용하는 공통 Post 타입
export interface Post {
  title: string;
  content: string;
  author?: string;
  tags?: string[];
  date?: string;
  createdAt?: string;
  excerpt?: string;
  slug?: string;
  id?: string | number;
  readTime?: string;
}

// 에러 타입 정의
export class ApiError extends Error {
  constructor(public status: number, message: string, public response?: any) {
    super(message);
    this.name = "ApiError";
  }
}
