const requests = {
  fetRegister: '/register',
  fetchLogin: "/login",
  fetchLogout: "/logout",
  fetchUsers: process.env.NEXT_PUBLIC_USER_URL,
  fetchRooms: process.env.NEXT_PUBLIC_ROOM_URL,
  fetchFiles: process.env.NEXT_PUBLIC_FILE_URL,
  fetchChats: process.env.NEXT_PUBLIC_CHAT_URL,
  fetchGroups: process.env.NEXT_PUBLIC_GROUP_URL,
  fetchComments: process.env.NEXT_PUBLIC_COMMENT_URL
}

export default requests;