/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  post: Post;
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Like = {
  __typename?: 'Like';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  post: Post;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  signIn: User;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationSignInArgs = {
  signInInput: SignInInput;
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  items: Array<Post>;
  pagination: PaginationMeta;
};

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  currentPage: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  previousPage?: Maybe<Scalars['Int']['output']>;
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  comments?: Maybe<Array<Maybe<Comment>>>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  likes?: Maybe<Array<Maybe<Like>>>;
  published: Scalars['Boolean']['output'];
  slug?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  post: Post;
  posts: PaginatedPosts;
};


export type QueryPostArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPostsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type User = {
  __typename?: 'User';
  accessToken?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type UserFragment = { __typename?: 'User', id: number, name: string, email: string, bio?: string | null, avatar?: string | null, createdAt: any };

export type PostFragment = { __typename?: 'Post', id: number, title: string, slug?: string | null, thumbnail?: string | null, content: string, published: boolean, createdAt: any, updatedAt: any };

export type CommentFragment = { __typename?: 'Comment', id: number, content: string, createdAt: any, updatedAt: any };

export type TagFragment = { __typename?: 'Tag', id: number, name: string };

export type LikeFragment = { __typename?: 'Like', id: number };

export type PaginationMetaFragment = { __typename?: 'PaginationMeta', totalItems: number, totalPages: number, currentPage: number, nextPage?: number | null, previousPage?: number | null };

export type PostsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPosts', pagination: { __typename?: 'PaginationMeta', totalItems: number, totalPages: number, currentPage: number, nextPage?: number | null, previousPage?: number | null }, items: Array<{ __typename?: 'Post', id: number, title: string, slug?: string | null, thumbnail?: string | null, content: string, published: boolean, createdAt: any, updatedAt: any }> } };

export type PostQueryVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'Post', id: number, title: string, slug?: string | null, thumbnail?: string | null, content: string, published: boolean, createdAt: any, updatedAt: any, author: { __typename?: 'User', id: number, name: string, email: string, bio?: string | null, avatar?: string | null, createdAt: any }, tags?: Array<{ __typename?: 'Tag', id: number, name: string } | null> | null, comments?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: any, updatedAt: any } | null> | null, likes?: Array<{ __typename?: 'Like', id: number } | null> | null } };

export const UserFragmentDoc = `
    fragment User on User {
  id
  name
  email
  bio
  avatar
  createdAt
}
    `;
export const PostFragmentDoc = `
    fragment Post on Post {
  id
  title
  slug
  thumbnail
  content
  published
  createdAt
  updatedAt
}
    `;
export const CommentFragmentDoc = `
    fragment Comment on Comment {
  id
  content
  createdAt
  updatedAt
}
    `;
export const TagFragmentDoc = `
    fragment Tag on Tag {
  id
  name
}
    `;
export const LikeFragmentDoc = `
    fragment Like on Like {
  id
}
    `;
export const PaginationMetaFragmentDoc = `
    fragment PaginationMeta on PaginationMeta {
  totalItems
  totalPages
  currentPage
  nextPage
  previousPage
}
    `;
export const PostsDocument = `
    query Posts($page: Int) {
  posts(page: $page) {
    pagination {
      ...PaginationMeta
    }
    items {
      ...Post
    }
  }
}
    ${PaginationMetaFragmentDoc}
${PostFragmentDoc}`;
export const PostDocument = `
    query Post($postId: Int!) {
  post(id: $postId) {
    ...Post
    author {
      ...User
    }
    tags {
      ...Tag
    }
    comments {
      ...Comment
    }
    likes {
      ...Like
    }
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}
${TagFragmentDoc}
${CommentFragmentDoc}
${LikeFragmentDoc}`;
export type Requester<C = {}> = <R, V>(doc: string, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    Posts(variables?: PostsQueryVariables, options?: C): Promise<PostsQuery> {
      return requester<PostsQuery, PostsQueryVariables>(PostsDocument, variables, options) as Promise<PostsQuery>;
    },
    Post(variables: PostQueryVariables, options?: C): Promise<PostQuery> {
      return requester<PostQuery, PostQueryVariables>(PostDocument, variables, options) as Promise<PostQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;