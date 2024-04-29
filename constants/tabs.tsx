import RepliesTab from "@/components/shared/RepliesTab";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Heart, HomeIcon, Search, SquarePen, User2 } from "lucide-react";

export const sidebarLinks = [
    {
        imgURL: HomeIcon,
        route: "/",
        label: "Home",
    },
    {
        imgURL: Search,
        route: "/search",
        label: "Search",
    },
    {
        imgURL: SquarePen,
        route: "/create-thread",
        label: "Create Thread",
        dialog: true
    },
    {
        imgURL: Heart,
        route: "/activity",
        label: "Activity",
    },
    {
        imgURL: User2,
        route: "/profile",
        label: "Profile",
    },
];

export const profileTabs = [
    { value: "threads", content: ThreadsTab, label: "Threads", icon: "/assets/reply.svg" },
    { value: "replies", content: RepliesTab, label: "Replies", icon: "/assets/members.svg" },
    { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "members", label: "Members", icon: "/assets/members.svg" },
    { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];