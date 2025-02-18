"use client";
import { useUser, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { use, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function DashboardPage() {
    const { isSignedIn, user } = useUser(); // Clerkの認証情報を取得
    let userId = user?.id; // ClerkのユーザーIDをそのまま使用// ClerkのUser IDを Convexの型に変換

    const [name, setName] = useState("John Doe");
    const [bio, setBio] = useState("I am a passionate full-stack developer.");
    const [skills, setSkills] = useState<string[]>(["JavaScript", "React", "Node.js"]);

    // ✅ useMutation をコンポーネント内で呼び出す
    const createPortfolio = useMutation(api.portfolios.createPortfolio);

    const handleSave = async () => {
        if (!isSignedIn) {
            alert("ログインしてください");
            return;
        }

        console.log("Saving portfolio with data:", { userId, name, bio, skills });

        try {
            userId = user!.id;
            const portfolioId = await createPortfolio({ userId, name, bio, skills });
            console.log(`New portfolio created with ID: ${portfolioId}`);
            alert("データが保存されました！");
        } catch (error) {
            console.error("データ保存エラー:", error);
            alert("データ保存に失敗しました。");
        }
    };

    if (!isSignedIn) {
        return (
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold">ログインが必要です</h1>
                <SignInButton />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <header className="flex justify-end items-center p-4 gap-4 h-16">
                <UserButton />
            </header>
            <h1 className="text-3xl font-bold">Edit Portfolio</h1>

            <label className="block mt-4">Name</label>
            <input
                className="w-full p-2 border"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label className="block mt-4">Bio</label>
            <textarea
                className="w-full p-2 border"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />

            <label className="block mt-4">Skills (comma-separated)</label>
            <input
                className="w-full p-2 border"
                value={skills.join(", ")}
                onChange={(e) => setSkills(e.target.value.split(",").map(s => s.trim()))}
            />

            <button className="mt-4 bg-blue-500 text-white px-4 py-2" onClick={handleSave}>
                Save
            </button>
        </div>
    );
}
