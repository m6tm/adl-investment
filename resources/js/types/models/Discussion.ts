import { discussions } from '@prisma/client'
import { DiscussionOwners } from './DiscussionOwner'
import { Messages } from './Message'

type Discussion = discussions & {
    discussion_owners: DiscussionOwners
    messages: Messages
}

export default Discussion