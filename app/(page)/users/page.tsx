import Link from "next/link";

interface User {
  id: number;
  nickname: string;
}

const userListData: User[] = [
  { id: 1, nickname: "User1" },
  { id: 2, nickname: "User2" },
  // 더 많은 사용자 데이터...
];

export default function UserList() {
  return (
    <div className="h-auto max-w-lg mx-auto my-[40px]">
      <div id="btn" className="m-2 max-w-full">
        <Link href="/admin" className="rounded-lg bg-green-400 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-500">
          뒤로가기
        </Link>
      </div>

      <ul className="h-1/2 px-10 py-10 bg-green-100 rounded-lg">
        {userListData.map(user => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`} className="inline-flex justify-around items-center w-full bg-green-50 border-2 border-green-400 p-4 m-2">
              <div className="size-8 bg-green-500 rounded-full">
                Img
              </div>
              <p>{user.nickname}</p>
              <button type="button" className="mx-2 rounded-lg bg-green-400 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-500">
                상세보기
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}