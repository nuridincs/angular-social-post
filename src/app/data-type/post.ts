export interface Post {
  id: number;
  userId?: number;
  title?: string;
  body?: string;
}

export interface User {
  id: number;
  name?: string;
  username?: string,
  [props: string]: any;
}

export interface Comment {
  id: number;
  postId?: number;
  userId?: number;
  title?: string;
  body?: string;
  [props: string]: any;
}

export interface PostDetail {
  post: Post,
  comment: Comment,
  user: User,
}