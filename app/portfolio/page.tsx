"use client";

import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Image from "next/image";
import { FaGithub, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import { Code2, Database, ChevronDown, LucideIcon } from "lucide-react";

const Portfolio = () => {
    const userId = process.env.NEXT_PUBLIC_USER_ID!;
    const portfolio = useQuery(api.portfolios.getPortfolio, { userId });

    const [isAuthorVisible, setIsAuthorVisible] = useState(false);


    const name = portfolio?.name ?? "John Doe";
    const bio = portfolio?.bio ?? "I am a passionate full-stack developer.";
    const skills = portfolio?.skills ?? ["JavaScript", "React", "Node.js"];
    const blogImgPath = "/blogimg.jpg";

    const frontendSkills = ["React", "Next.js", "TypeScript", "Tailwind CSS"];
    const backendSkills = ["Node.js", "Python", "PostgreSQL", "Render"];

    // ✅ Skill Badge コンポーネント
    const SkillBadge = ({ skill }: { skill: string }) => (
        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
            {skill}
        </span>
    );

    // ✅ Section コンポーネント
    const Section = ({
        title,
        icon: LucideIcon,
        skills,
        description,
        url,
    }: {
        title: string;
        icon: LucideIcon;
        skills: string[];
        description: string;
        url: string;
    }) => (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
                <LucideIcon className="w-6 h-6 mr-2 text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill, index) => (
                    <SkillBadge key={index} skill={skill} />
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 font-medium flex items-center"
                >
                    <FaGithub className="w-5 h-5 mr-2" />
                    View Projects
                </a>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-32">
            {/* ✅ ヘッダー画像 */}
            <header className="relative w-full h-60 mb-8">
                <Image
                    src={blogImgPath}
                    alt="Portfolio Header"
                    layout="fill"
                    objectFit="cover"
                    className="brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h1 className="text-4xl font-bold mb-2">Portfolio</h1>
                    <p className="text-xl text-gray-200">Full Stack Developer</p>
                </div>
            </header>

            {/* ✅ メインコンテンツ */}
            <main className="container mx-auto px-4 max-w-5xl">
                <div className="grid md:grid-cols-2 gap-6">
                    <Section
                        title="Frontend Development"
                        icon={Code2}
                        skills={frontendSkills}
                        description="Modern web applications built with React and Next.js, focusing on performance and user experience."
                        url="https://nextjs-blog-udemy-km7ndj706-yoshimurahisa-gmailcoms-projects.vercel.app/"
                    />
                    <Section
                        title="Backend Development"
                        icon={Database}
                        skills={backendSkills}
                        description="Scalable and secure server-side solutions using Node.js and Python, with cloud infrastructure on GCP."
                        url="https://first-api-repo.onrender.com/docs"
                    />
                </div>
            </main>

            {/* ✅ Author Info (フッター固定・デフォルト非表示) */}
            <div className={`fixed bottom-0 left-0 w-full bg-white shadow-lg transition-transform duration-300 ${isAuthorVisible ? "translate-y-0" : "translate-y-full"}`}>
                {/* ✅ トグルボタン (Contact me / 矢印) */}
                <button
                    onClick={() => setIsAuthorVisible(!isAuthorVisible)}
                    className="absolute -top-12 right-4 bg-white px-3 py-1 rounded-t-lg shadow-lg text-gray-700 text-sm font-semibold hover:bg-gray-100 transition"
                >
                    {isAuthorVisible ? <ChevronDown className="w-6 h-6" /> : "Contact me"}
                </button>

                <div className="container mx-auto px-4 py-4 max-w-5xl">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">Author Info</h2>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-600"><strong className="text-gray-800">Name:</strong> {name}</p>
                                <p className="text-gray-600"><strong className="text-gray-800">Bio:</strong> {bio}</p>
                                <p className="text-gray-600">
                                    <strong className="text-gray-800">Skills:</strong> {skills.join(", ")}
                                </p>
                            </div>
                            <div className="flex items-center justify-end gap-6">
                                <a href="https://github.com/kazuma0606/" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
                                    <FaGithub className="w-8 h-8 text-gray-700 hover:text-black" />
                                </a>
                                <a href="mailto:yoshimura.hisa@gmail.com" className="transform hover:scale-110 transition-transform">
                                    <FaEnvelope className="w-8 h-8 text-gray-700 hover:text-red-500" />
                                </a>
                                <a href="https://x.com/kazuma_Eduscope" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
                                    <FaXTwitter className="w-8 h-8 text-gray-700 hover:text-blue-500" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
