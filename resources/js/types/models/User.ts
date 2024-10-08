import { discussion_owners, users } from "@prisma/client"
import { DiscussionOwners } from "./DiscussionOwner"

type UserModel = users & {
    discussion_owners: discussion_owners[]
}

export default UserModel