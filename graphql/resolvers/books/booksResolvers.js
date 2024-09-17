import { GraphQLError } from "graphql";
import { prisma } from "../../../prisma/db.js";


export const booksResolvers = {
    Query: {
        books: async () => {

            let books = await prisma.book.findMany({
                include: {
                    author: true,
                    _count: {
                        select: { comments: true }
                    },
                }
            })

            if (books) return books
            return new GraphQLError('No books found', {
                extensions: {
                    errorList: {}
                },
            });

        },
        book: async (_, args, contextValue, info) => {

            const book = await prisma.book.findFirst(
                {
                    where: { id: parseInt(args.id) },
                    include: {
                        author: true,
                        comments: {
                            select: {
                                id: true,
                                content: true,
                                author: {
                                    select: {
                                        username: true
                                    }
                                }
                            }
                        }
                    }
                }
            )
            console.log(book)
            if (book) return book
            return new GraphQLError('Book not found', {
                extensions: {
                    errorList: {}
                },
            });

        }
    }
};