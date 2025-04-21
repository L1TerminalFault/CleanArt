"use client"

import ChatComponent from './chatComponent'

export default function ({ adminId, chatsFiltered, selectedUserImage, currentUserImage, currentUserId }) {

  return (
    <div className="h-[calc(100vh-120px)] md:h-[calc(100vh-150px)] pb-1 md:pb-0">
      
      <ChatComponent adminId={adminId} chatsFiltered={chatsFiltered} selectedUserImage={selectedUserImage} currentUserImage={currentUserImage} currentUserId={currentUserId} />

    </div>
  )
}
