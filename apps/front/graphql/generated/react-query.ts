/* eslint-disable */
import type { XiorError } from 'xior';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { reactQueryFetcher } from '@/graphql/xior';
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
  refreshToken: Scalars['String']['output'];
  signIn: User;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String']['input'];
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
  me: User;
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

/** The role of a user */
export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

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
  refreshToken?: Maybe<Scalars['String']['output']>;
  role: Role;
};

export type UserFragment = { __typename?: 'User', id: number, name: string, email: string, bio?: string | null, avatar?: string | null, createdAt: any, role: Role };

export type PostFragment = { __typename?: 'Post', id: number, title: string, slug?: string | null, thumbnail?: string | null, content: string, published: boolean, createdAt: any, updatedAt: any };

export type CommentFragment = { __typename?: 'Comment', id: number, content: string, createdAt: any, updatedAt: any };

export type TagFragment = { __typename?: 'Tag', id: number, name: string };

export type LikeFragment = { __typename?: 'Like', id: number };

export type PaginationMetaFragment = { __typename?: 'PaginationMeta', totalItems: number, totalPages: number, currentPage: number, nextPage?: number | null, previousPage?: number | null };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', accessToken?: string | null, id: number, name: string, email: string, bio?: string | null, avatar?: string | null, createdAt: any, role: Role } };

export type RefreshTokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: string };

export type SignInMutationVariables = Exact<{
  signInInput: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'User', accessToken?: string | null, id: number, name: string, email: string, bio?: string | null, avatar?: string | null, createdAt: any, role: Role } };

export type PostsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPosts', pagination: { __typename?: 'PaginationMeta', totalItems: number, totalPages: number, currentPage: number, nextPage?: number | null, previousPage?: number | null }, items: Array<{ __typename?: 'Post', id: number, title: string, slug?: string | null, thumbnail?: string | null, content: string, published: boolean, createdAt: any, updatedAt: any }> } };

export type PostQueryVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'Post', id: number, title: string, slug?: string | null, thumbnail?: string | null, content: string, published: boolean, createdAt: any, updatedAt: any, author: { __typename?: 'User', id: number, name: string, email: string, bio?: string | null, avatar?: string | null, createdAt: any, role: Role }, tags?: Array<{ __typename?: 'Tag', id: number, name: string } | null> | null, comments?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: any, updatedAt: any } | null> | null, likes?: Array<{ __typename?: 'Like', id: number } | null> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, name: string, email: string, bio?: string | null, avatar?: string | null, createdAt: any, role: Role } };


export const UserFragmentDoc = `
    fragment User on User {
  id
  name
  email
  bio
  avatar
  createdAt
  role
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
export const CreateUserDocument = `
    mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    ...User
    accessToken
  }
}
    ${UserFragmentDoc}`;

export const useCreateUserMutation = <
      TError = XiorError,
      TContext = unknown
    >(options?: UseMutationOptions<CreateUserMutation, TError, CreateUserMutationVariables, TContext>) => {
    
    return useMutation<CreateUserMutation, TError, CreateUserMutationVariables, TContext>(
      {
    mutationKey: ['CreateUser'],
    mutationFn: (variables?: CreateUserMutationVariables) => reactQueryFetcher<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, variables)(),
    ...options
  }
    )};

export const RefreshTokenDocument = `
    mutation RefreshToken($token: String!) {
  refreshToken(token: $token)
}
    `;

export const useRefreshTokenMutation = <
      TError = XiorError,
      TContext = unknown
    >(options?: UseMutationOptions<RefreshTokenMutation, TError, RefreshTokenMutationVariables, TContext>) => {
    
    return useMutation<RefreshTokenMutation, TError, RefreshTokenMutationVariables, TContext>(
      {
    mutationKey: ['RefreshToken'],
    mutationFn: (variables?: RefreshTokenMutationVariables) => reactQueryFetcher<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, variables)(),
    ...options
  }
    )};

export const SignInDocument = `
    mutation SignIn($signInInput: SignInInput!) {
  signIn(signInInput: $signInInput) {
    ...User
    accessToken
  }
}
    ${UserFragmentDoc}`;

export const useSignInMutation = <
      TError = XiorError,
      TContext = unknown
    >(options?: UseMutationOptions<SignInMutation, TError, SignInMutationVariables, TContext>) => {
    
    return useMutation<SignInMutation, TError, SignInMutationVariables, TContext>(
      {
    mutationKey: ['SignIn'],
    mutationFn: (variables?: SignInMutationVariables) => reactQueryFetcher<SignInMutation, SignInMutationVariables>(SignInDocument, variables)(),
    ...options
  }
    )};

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

export const usePostsQuery = <
      TData = PostsQuery,
      TError = XiorError
    >(
      variables?: PostsQueryVariables,
      options?: Omit<UseQueryOptions<PostsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<PostsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<PostsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Posts'] : ['Posts', variables],
    queryFn: reactQueryFetcher<PostsQuery, PostsQueryVariables>(PostsDocument, variables),
    ...options
  }
    )};

usePostsQuery.getKey = (variables?: PostsQueryVariables) => variables === undefined ? ['Posts'] : ['Posts', variables];

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

export const usePostQuery = <
      TData = PostQuery,
      TError = XiorError
    >(
      variables: PostQueryVariables,
      options?: Omit<UseQueryOptions<PostQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<PostQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<PostQuery, TError, TData>(
      {
    queryKey: ['Post', variables],
    queryFn: reactQueryFetcher<PostQuery, PostQueryVariables>(PostDocument, variables),
    ...options
  }
    )};

usePostQuery.getKey = (variables: PostQueryVariables) => ['Post', variables];

export const MeDocument = `
    query Me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

export const useMeQuery = <
      TData = MeQuery,
      TError = XiorError
    >(
      variables?: MeQueryVariables,
      options?: Omit<UseQueryOptions<MeQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<MeQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<MeQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Me'] : ['Me', variables],
    queryFn: reactQueryFetcher<MeQuery, MeQueryVariables>(MeDocument, variables),
    ...options
  }
    )};

useMeQuery.getKey = (variables?: MeQueryVariables) => variables === undefined ? ['Me'] : ['Me', variables];


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    