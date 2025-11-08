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
  author?: Maybe<User>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  post: Post;
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateCommentInput = {
  content: Scalars['String']['input'];
};

export type CreateLikeInput = {
  postId: Scalars['Int']['input'];
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
  createComment: Comment;
  createUser: User;
  deleteComment: Scalars['Boolean']['output'];
  refreshToken: Scalars['String']['output'];
  signIn: User;
  toggleLike: Scalars['Boolean']['output'];
};


export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
  postId: Scalars['Int']['input'];
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  signInInput: SignInInput;
};


export type MutationToggleLikeArgs = {
  createLikeInput: CreateLikeInput;
};

export type PaginatedComments = {
  __typename?: 'PaginatedComments';
  items: Array<Comment>;
  pagination: PaginationMeta;
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
  isLikedByCurrentUser?: Maybe<Scalars['Boolean']['output']>;
  likeCount: Scalars['Int']['output'];
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
  comments: PaginatedComments;
  me: User;
  post: Post;
  posts: PaginatedPosts;
};


export type QueryCommentsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  postId: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
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

export type CreateCommentMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
  createCommentInput: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', content: string, id: number } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', accessToken?: string | null, id: number, name: string, email: string, bio?: string | null, avatar?: string | null, createdAt: any, role: Role } };

export type DeleteCommentMutationVariables = Exact<{
  deleteCommentId: Scalars['Int']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type RefreshTokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: string };

export type SignInMutationVariables = Exact<{
  signInInput: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'User', accessToken?: string | null, id: number, name: string, email: string, bio?: string | null, avatar?: string | null, createdAt: any, role: Role } };

export type ToggleLikeMutationVariables = Exact<{
  createLikeInput: CreateLikeInput;
}>;


export type ToggleLikeMutation = { __typename?: 'Mutation', toggleLike: boolean };

export type CommentsQueryVariables = Exact<{
  postId: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CommentsQuery = { __typename?: 'Query', comments: { __typename?: 'PaginatedComments', pagination: { __typename?: 'PaginationMeta', totalItems: number, totalPages: number, currentPage: number, nextPage?: number | null, previousPage?: number | null }, items: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: any, updatedAt: any, author?: { __typename?: 'User', name: string, avatar?: string | null, role: Role, id: number } | null }> } };

export type PostsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPosts', pagination: { __typename?: 'PaginationMeta', totalItems: number, totalPages: number, currentPage: number, nextPage?: number | null, previousPage?: number | null }, items: Array<{ __typename?: 'Post', id: number, title: string, slug?: string | null, thumbnail?: string | null, content: string, published: boolean, createdAt: any, updatedAt: any }> } };

export type PostQueryVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'Post', likeCount: number, isLikedByCurrentUser?: boolean | null, id: number, title: string, slug?: string | null, thumbnail?: string | null, content: string, published: boolean, createdAt: any, updatedAt: any, author: { __typename?: 'User', id: number, name: string, email: string, bio?: string | null, avatar?: string | null, createdAt: any, role: Role }, tags?: Array<{ __typename?: 'Tag', id: number, name: string } | null> | null, comments?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: any, updatedAt: any } | null> | null, likes?: Array<{ __typename?: 'Like', id: number } | null> | null } };

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
export const CreateCommentDocument = `
    mutation CreateComment($postId: Int!, $createCommentInput: CreateCommentInput!) {
  createComment(postId: $postId, createCommentInput: $createCommentInput) {
    content
    id
  }
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
export const DeleteCommentDocument = `
    mutation DeleteComment($deleteCommentId: Int!) {
  deleteComment(id: $deleteCommentId)
}
    `;
export const RefreshTokenDocument = `
    mutation RefreshToken($token: String!) {
  refreshToken(token: $token)
}
    `;
export const SignInDocument = `
    mutation SignIn($signInInput: SignInInput!) {
  signIn(signInInput: $signInInput) {
    ...User
    accessToken
  }
}
    ${UserFragmentDoc}`;
export const ToggleLikeDocument = `
    mutation ToggleLike($createLikeInput: CreateLikeInput!) {
  toggleLike(createLikeInput: $createLikeInput)
}
    `;
export const CommentsDocument = `
    query Comments($postId: Int!, $page: Int) {
  comments(postId: $postId, page: $page) {
    pagination {
      ...PaginationMeta
    }
    items {
      ...Comment
      author {
        name
        avatar
        role
        id
      }
    }
  }
}
    ${PaginationMetaFragmentDoc}
${CommentFragmentDoc}`;
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
    likeCount
    isLikedByCurrentUser
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
export const MeDocument = `
    query Me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type Requester<C = {}> = <R, V>(doc: string, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    CreateComment(variables: CreateCommentMutationVariables, options?: C): Promise<CreateCommentMutation> {
      return requester<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, variables, options) as Promise<CreateCommentMutation>;
    },
    CreateUser(variables: CreateUserMutationVariables, options?: C): Promise<CreateUserMutation> {
      return requester<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, variables, options) as Promise<CreateUserMutation>;
    },
    DeleteComment(variables: DeleteCommentMutationVariables, options?: C): Promise<DeleteCommentMutation> {
      return requester<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, variables, options) as Promise<DeleteCommentMutation>;
    },
    RefreshToken(variables: RefreshTokenMutationVariables, options?: C): Promise<RefreshTokenMutation> {
      return requester<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, variables, options) as Promise<RefreshTokenMutation>;
    },
    SignIn(variables: SignInMutationVariables, options?: C): Promise<SignInMutation> {
      return requester<SignInMutation, SignInMutationVariables>(SignInDocument, variables, options) as Promise<SignInMutation>;
    },
    ToggleLike(variables: ToggleLikeMutationVariables, options?: C): Promise<ToggleLikeMutation> {
      return requester<ToggleLikeMutation, ToggleLikeMutationVariables>(ToggleLikeDocument, variables, options) as Promise<ToggleLikeMutation>;
    },
    Comments(variables: CommentsQueryVariables, options?: C): Promise<CommentsQuery> {
      return requester<CommentsQuery, CommentsQueryVariables>(CommentsDocument, variables, options) as Promise<CommentsQuery>;
    },
    Posts(variables?: PostsQueryVariables, options?: C): Promise<PostsQuery> {
      return requester<PostsQuery, PostsQueryVariables>(PostsDocument, variables, options) as Promise<PostsQuery>;
    },
    Post(variables: PostQueryVariables, options?: C): Promise<PostQuery> {
      return requester<PostQuery, PostQueryVariables>(PostDocument, variables, options) as Promise<PostQuery>;
    },
    Me(variables?: MeQueryVariables, options?: C): Promise<MeQuery> {
      return requester<MeQuery, MeQueryVariables>(MeDocument, variables, options) as Promise<MeQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;