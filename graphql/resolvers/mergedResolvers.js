import { mergeResolvers } from '@graphql-tools/merge';
import { booksResolvers } from './books/booksResolvers.js'

export const mergedResolvers = mergeResolvers([booksResolvers])