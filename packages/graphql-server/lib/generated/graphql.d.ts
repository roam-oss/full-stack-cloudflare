import { GraphQLResolveInfo } from 'graphql';
export declare type Maybe<T> = T | null;
export declare type InputMaybe<T> = Maybe<T>;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export declare type RequireFields<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};
export declare type CreateObjectInput = {
    data: Scalars['String'];
    id?: InputMaybe<Scalars['ID']>;
    type: ObjectType;
};
export declare type Mutation = {
    __typename?: 'Mutation';
    putObject: Object;
};
export declare type MutationPutObjectArgs = {
    input: CreateObjectInput;
};
export declare type Object = {
    __typename?: 'Object';
    data: Scalars['String'];
    id: Scalars['ID'];
    type: ObjectType;
};
export declare enum ObjectType {
    Cache = "CACHE"
}
export declare type Query = {
    __typename?: 'Query';
    allObjects?: Maybe<Array<Maybe<Object>>>;
    getObject: Object;
};
export declare type QueryAllObjectsArgs = {
    type: ObjectType;
};
export declare type QueryGetObjectArgs = {
    id: Scalars['ID'];
    type: ObjectType;
};
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export declare type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;
export declare type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export declare type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export declare type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export declare type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export declare type ResolversTypes = {
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    CreateObjectInput: CreateObjectInput;
    ID: ResolverTypeWrapper<Scalars['ID']>;
    Mutation: ResolverTypeWrapper<{}>;
    Object: ResolverTypeWrapper<Object>;
    ObjectType: ObjectType;
    Query: ResolverTypeWrapper<{}>;
    String: ResolverTypeWrapper<Scalars['String']>;
};
/** Mapping between all available schema types and the resolvers parents */
export declare type ResolversParentTypes = {
    Boolean: Scalars['Boolean'];
    CreateObjectInput: CreateObjectInput;
    ID: Scalars['ID'];
    Mutation: {};
    Object: Object;
    Query: {};
    String: Scalars['String'];
};
export declare type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
    putObject?: Resolver<ResolversTypes['Object'], ParentType, ContextType, RequireFields<MutationPutObjectArgs, 'input'>>;
};
export declare type ObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Object'] = ResolversParentTypes['Object']> = {
    data?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    type?: Resolver<ResolversTypes['ObjectType'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
    allObjects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Object']>>>, ParentType, ContextType, RequireFields<QueryAllObjectsArgs, 'type'>>;
    getObject?: Resolver<ResolversTypes['Object'], ParentType, ContextType, RequireFields<QueryGetObjectArgs, 'id' | 'type'>>;
};
export declare type Resolvers<ContextType = any> = {
    Mutation?: MutationResolvers<ContextType>;
    Object?: ObjectResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
};
