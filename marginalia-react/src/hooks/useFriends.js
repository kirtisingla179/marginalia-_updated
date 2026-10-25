import { useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import * as friendService from '../services/friendService'

export default function useFriends() {
  const { user } = useAuth()
  const [friendIds, setFriendIds] = useState(() => friendService.getFriendIds(user?.id))
  const [requestIds, setRequestIds] = useState(() => friendService.getRequestIds(user?.id))

  // public accounts: add / remove instantly
  const toggleFriend = useCallback(
    (authorId) => {
      if (user) setFriendIds(friendService.toggleFriend(user.id, authorId))
    },
    [user],
  )

  // private accounts: only a request is sent; owner must accept
  const sendRequest = useCallback(
    (authorId) => user && setRequestIds(friendService.sendRequest(user.id, authorId)),
    [user],
  )
  const cancelRequest = useCallback(
    (authorId) => user && setRequestIds(friendService.cancelRequest(user.id, authorId)),
    [user],
  )
  const simulateAccept = useCallback(
    (authorId) => {
      if (!user) return
      friendService.acceptRequest(user.id, authorId)
      setFriendIds(friendService.getFriendIds(user.id))
      setRequestIds(friendService.getRequestIds(user.id))
    },
    [user],
  )

  return {
    friendIds,
    toggleFriend,
    isFriend: (id) => friendIds.includes(id),
    isRequested: (id) => requestIds.includes(id),
    sendRequest,
    cancelRequest,
    simulateAccept,
  }
}
