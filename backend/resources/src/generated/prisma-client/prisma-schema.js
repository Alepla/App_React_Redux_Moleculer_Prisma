module.exports = {
        typeDefs: /* GraphQL */ `type Aggregatemessage {
  count: Int!
}

type Aggregaterequests {
  count: Int!
}

type Aggregateuser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type message {
  id: ID!
  content: String!
  author: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type messageConnection {
  pageInfo: PageInfo!
  edges: [messageEdge]!
  aggregate: Aggregatemessage!
}

input messageCreateInput {
  content: String!
  author: String!
}

type messageEdge {
  node: message!
  cursor: String!
}

enum messageOrderByInput {
  id_ASC
  id_DESC
  content_ASC
  content_DESC
  author_ASC
  author_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type messagePreviousValues {
  id: ID!
  content: String!
  author: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type messageSubscriptionPayload {
  mutation: MutationType!
  node: message
  updatedFields: [String!]
  previousValues: messagePreviousValues
}

input messageSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: messageWhereInput
  AND: [messageSubscriptionWhereInput!]
  OR: [messageSubscriptionWhereInput!]
  NOT: [messageSubscriptionWhereInput!]
}

input messageUpdateInput {
  content: String
  author: String
}

input messageUpdateManyMutationInput {
  content: String
  author: String
}

input messageWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  author: String
  author_not: String
  author_in: [String!]
  author_not_in: [String!]
  author_lt: String
  author_lte: String
  author_gt: String
  author_gte: String
  author_contains: String
  author_not_contains: String
  author_starts_with: String
  author_not_starts_with: String
  author_ends_with: String
  author_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [messageWhereInput!]
  OR: [messageWhereInput!]
  NOT: [messageWhereInput!]
}

input messageWhereUniqueInput {
  id: ID
}

type Mutation {
  createmessage(data: messageCreateInput!): message!
  updatemessage(data: messageUpdateInput!, where: messageWhereUniqueInput!): message
  updateManymessages(data: messageUpdateManyMutationInput!, where: messageWhereInput): BatchPayload!
  upsertmessage(where: messageWhereUniqueInput!, create: messageCreateInput!, update: messageUpdateInput!): message!
  deletemessage(where: messageWhereUniqueInput!): message
  deleteManymessages(where: messageWhereInput): BatchPayload!
  createrequests(data: requestsCreateInput!): requests!
  updaterequests(data: requestsUpdateInput!, where: requestsWhereUniqueInput!): requests
  upsertrequests(where: requestsWhereUniqueInput!, create: requestsCreateInput!, update: requestsUpdateInput!): requests!
  deleterequests(where: requestsWhereUniqueInput!): requests
  deleteManyrequestses(where: requestsWhereInput): BatchPayload!
  createuser(data: userCreateInput!): user!
  updateuser(data: userUpdateInput!, where: userWhereUniqueInput!): user
  updateManyusers(data: userUpdateManyMutationInput!, where: userWhereInput): BatchPayload!
  upsertuser(where: userWhereUniqueInput!, create: userCreateInput!, update: userUpdateInput!): user!
  deleteuser(where: userWhereUniqueInput!): user
  deleteManyusers(where: userWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  message(where: messageWhereUniqueInput!): message
  messages(where: messageWhereInput, orderBy: messageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [message]!
  messagesConnection(where: messageWhereInput, orderBy: messageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): messageConnection!
  requests(where: requestsWhereUniqueInput!): requests
  requestses(where: requestsWhereInput, orderBy: requestsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [requests]!
  requestsesConnection(where: requestsWhereInput, orderBy: requestsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): requestsConnection!
  user(where: userWhereUniqueInput!): user
  users(where: userWhereInput, orderBy: userOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [user]!
  usersConnection(where: userWhereInput, orderBy: userOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): userConnection!
  node(id: ID!): Node
}

type requests {
  id: ID!
  userApplicant: user!
  userRequested: user!
  createdAt: DateTime!
}

type requestsConnection {
  pageInfo: PageInfo!
  edges: [requestsEdge]!
  aggregate: Aggregaterequests!
}

input requestsCreateInput {
  userApplicant: userCreateOneInput!
  userRequested: userCreateOneInput!
}

type requestsEdge {
  node: requests!
  cursor: String!
}

enum requestsOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type requestsPreviousValues {
  id: ID!
  createdAt: DateTime!
}

type requestsSubscriptionPayload {
  mutation: MutationType!
  node: requests
  updatedFields: [String!]
  previousValues: requestsPreviousValues
}

input requestsSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: requestsWhereInput
  AND: [requestsSubscriptionWhereInput!]
  OR: [requestsSubscriptionWhereInput!]
  NOT: [requestsSubscriptionWhereInput!]
}

input requestsUpdateInput {
  userApplicant: userUpdateOneRequiredInput
  userRequested: userUpdateOneRequiredInput
}

input requestsWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  userApplicant: userWhereInput
  userRequested: userWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [requestsWhereInput!]
  OR: [requestsWhereInput!]
  NOT: [requestsWhereInput!]
}

input requestsWhereUniqueInput {
  id: ID
}

type Subscription {
  message(where: messageSubscriptionWhereInput): messageSubscriptionPayload
  requests(where: requestsSubscriptionWhereInput): requestsSubscriptionPayload
  user(where: userSubscriptionWhereInput): userSubscriptionPayload
}

type user {
  id: ID!
  username: String!
  name: String
  lastName: String
  email: String!
  password: String!
  friends(where: userWhereInput, orderBy: userOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [user!]
  bio: String
  image: String
  locality: String
  birthDay: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

type userConnection {
  pageInfo: PageInfo!
  edges: [userEdge]!
  aggregate: Aggregateuser!
}

input userCreateInput {
  username: String!
  name: String
  lastName: String
  email: String!
  password: String!
  friends: userCreateManyInput
  bio: String
  image: String
  locality: String
  birthDay: String
}

input userCreateManyInput {
  create: [userCreateInput!]
  connect: [userWhereUniqueInput!]
}

input userCreateOneInput {
  create: userCreateInput
  connect: userWhereUniqueInput
}

type userEdge {
  node: user!
  cursor: String!
}

enum userOrderByInput {
  id_ASC
  id_DESC
  username_ASC
  username_DESC
  name_ASC
  name_DESC
  lastName_ASC
  lastName_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  bio_ASC
  bio_DESC
  image_ASC
  image_DESC
  locality_ASC
  locality_DESC
  birthDay_ASC
  birthDay_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type userPreviousValues {
  id: ID!
  username: String!
  name: String
  lastName: String
  email: String!
  password: String!
  bio: String
  image: String
  locality: String
  birthDay: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

input userScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  bio: String
  bio_not: String
  bio_in: [String!]
  bio_not_in: [String!]
  bio_lt: String
  bio_lte: String
  bio_gt: String
  bio_gte: String
  bio_contains: String
  bio_not_contains: String
  bio_starts_with: String
  bio_not_starts_with: String
  bio_ends_with: String
  bio_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  locality: String
  locality_not: String
  locality_in: [String!]
  locality_not_in: [String!]
  locality_lt: String
  locality_lte: String
  locality_gt: String
  locality_gte: String
  locality_contains: String
  locality_not_contains: String
  locality_starts_with: String
  locality_not_starts_with: String
  locality_ends_with: String
  locality_not_ends_with: String
  birthDay: String
  birthDay_not: String
  birthDay_in: [String!]
  birthDay_not_in: [String!]
  birthDay_lt: String
  birthDay_lte: String
  birthDay_gt: String
  birthDay_gte: String
  birthDay_contains: String
  birthDay_not_contains: String
  birthDay_starts_with: String
  birthDay_not_starts_with: String
  birthDay_ends_with: String
  birthDay_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [userScalarWhereInput!]
  OR: [userScalarWhereInput!]
  NOT: [userScalarWhereInput!]
}

type userSubscriptionPayload {
  mutation: MutationType!
  node: user
  updatedFields: [String!]
  previousValues: userPreviousValues
}

input userSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: userWhereInput
  AND: [userSubscriptionWhereInput!]
  OR: [userSubscriptionWhereInput!]
  NOT: [userSubscriptionWhereInput!]
}

input userUpdateDataInput {
  username: String
  name: String
  lastName: String
  email: String
  password: String
  friends: userUpdateManyInput
  bio: String
  image: String
  locality: String
  birthDay: String
}

input userUpdateInput {
  username: String
  name: String
  lastName: String
  email: String
  password: String
  friends: userUpdateManyInput
  bio: String
  image: String
  locality: String
  birthDay: String
}

input userUpdateManyDataInput {
  username: String
  name: String
  lastName: String
  email: String
  password: String
  bio: String
  image: String
  locality: String
  birthDay: String
}

input userUpdateManyInput {
  create: [userCreateInput!]
  update: [userUpdateWithWhereUniqueNestedInput!]
  upsert: [userUpsertWithWhereUniqueNestedInput!]
  delete: [userWhereUniqueInput!]
  connect: [userWhereUniqueInput!]
  set: [userWhereUniqueInput!]
  disconnect: [userWhereUniqueInput!]
  deleteMany: [userScalarWhereInput!]
  updateMany: [userUpdateManyWithWhereNestedInput!]
}

input userUpdateManyMutationInput {
  username: String
  name: String
  lastName: String
  email: String
  password: String
  bio: String
  image: String
  locality: String
  birthDay: String
}

input userUpdateManyWithWhereNestedInput {
  where: userScalarWhereInput!
  data: userUpdateManyDataInput!
}

input userUpdateOneRequiredInput {
  create: userCreateInput
  update: userUpdateDataInput
  upsert: userUpsertNestedInput
  connect: userWhereUniqueInput
}

input userUpdateWithWhereUniqueNestedInput {
  where: userWhereUniqueInput!
  data: userUpdateDataInput!
}

input userUpsertNestedInput {
  update: userUpdateDataInput!
  create: userCreateInput!
}

input userUpsertWithWhereUniqueNestedInput {
  where: userWhereUniqueInput!
  update: userUpdateDataInput!
  create: userCreateInput!
}

input userWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  friends_every: userWhereInput
  friends_some: userWhereInput
  friends_none: userWhereInput
  bio: String
  bio_not: String
  bio_in: [String!]
  bio_not_in: [String!]
  bio_lt: String
  bio_lte: String
  bio_gt: String
  bio_gte: String
  bio_contains: String
  bio_not_contains: String
  bio_starts_with: String
  bio_not_starts_with: String
  bio_ends_with: String
  bio_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  locality: String
  locality_not: String
  locality_in: [String!]
  locality_not_in: [String!]
  locality_lt: String
  locality_lte: String
  locality_gt: String
  locality_gte: String
  locality_contains: String
  locality_not_contains: String
  locality_starts_with: String
  locality_not_starts_with: String
  locality_ends_with: String
  locality_not_ends_with: String
  birthDay: String
  birthDay_not: String
  birthDay_in: [String!]
  birthDay_not_in: [String!]
  birthDay_lt: String
  birthDay_lte: String
  birthDay_gt: String
  birthDay_gte: String
  birthDay_contains: String
  birthDay_not_contains: String
  birthDay_starts_with: String
  birthDay_not_starts_with: String
  birthDay_ends_with: String
  birthDay_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [userWhereInput!]
  OR: [userWhereInput!]
  NOT: [userWhereInput!]
}

input userWhereUniqueInput {
  id: ID
  username: String
  email: String
}
`
      }
    