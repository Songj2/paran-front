"use client";
import { useState, useMemo } from "react";
import SideBarTab from "./SideBarTab";
import ContentArea from "./ContentArea";
import { FaBook, FaSchool } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6"
import { MdMessage } from "react-icons/md";
import SellerButton from "../../user/seller/SellerButton";
import { useSelector } from "react-redux";
import { getCurrentUser } from "@/lib/features/users/user.slice";
import { initialGroupState } from "@/app/model/group/group.model";

const allTabs = [
  { name: "Groups", icon: <FaUserGroup />, label: "우리들의 모임" },
  { name: "Rooms", icon: <FaSchool />, label: "우리들의 공간" },
  { name: "Books", icon: <FaBook />, label: "우리들의 책" },
  { name: "Chats", icon: <MdMessage />, label: "참여중인 채팅보기" },
];

export default function SideBar() {
  const [activeTab, setActiveTab] = useState("Groups");
  const userInfo = useSelector(getCurrentUser);
  const user = useSelector(getCurrentUser);
  const group = initialGroupState
  const userGroups = group.groupMembers ? user?.nickname : null ;
  
  const tabs = useMemo(() => {
    // 사용자가 그룹에 참여 중이면 모든 탭을 표시
    if (userGroups && userGroups.length > 0) {
      console.log(user);
      return allTabs; 
    } else {
      // 그룹에 참여하지 않았으면 Chats 탭을 제외
      return allTabs.filter(tab => tab.name !== "Chats"); 
    }
  }, [userGroups]);

  return (
    <div>
      {user?.role === 'ROLE_seller' && <SellerButton />}
      <div className="flex min-h-screen w-full">
        <aside id="default-sidebar" className="w-64 bg-green-100" aria-label="Sidebar">
          <div className="h-full overflow-y-auto px-3 py-4">
            <ul className="space-y-2 font-medium">
              {tabs.map((tab) => (
                <SideBarTab
                  key={tab.name}
                  tab={tab}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              ))}
            </ul>
          </div>
        </aside>
        <ContentArea activeTab={activeTab} />
      </div>
    </div>
  );
}