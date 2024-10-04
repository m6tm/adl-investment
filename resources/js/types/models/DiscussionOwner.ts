import { discussion_owners, discussions, users } from '@prisma/client';
import UserModel from './User';
import Discussion from './Discussion';

type DiscussionOwner = discussion_owners & {
    users: UserModel
    discussions: Discussion
}

export type DiscussionOwners = DiscussionOwner[]

export default DiscussionOwner