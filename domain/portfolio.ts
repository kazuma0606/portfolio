export interface Project {
    title: string;
    description: string;
    imageUrl?: string;
    projectUrl?: string;
}

export interface Portfolio {
    userId: string;
    name: string;
    bio: string;
    skills: string[];
    projects: Project[];
}