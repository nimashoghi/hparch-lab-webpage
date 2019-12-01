import {promises as fs} from "fs"
import matter from "gray-matter"
import path from "path"

export type Post = matter.GrayMatterFile<string> & {
    data: {
        title: string
        subtitle?: string
        description: string
        image?: string
    }
}

export interface ButtonInformation {
    title: string
    href: string
    variant: "contained" | "outlined"
}

export type Information = matter.GrayMatterFile<string> & {
    data: {
        title: string
        subtitle: string
        buttons: ButtonInformation[]
    }
}

export function assert(input: unknown): asserts input {
    if (!input) {
        throw new Error("Failed assertion")
    }
}

export const getPosts = async (contentPath: string): Promise<Post[]> => {
    const postsPath = path.join(contentPath, "posts")
    const files = await Promise.all(
        (await fs.readdir(postsPath))
            .filter(file => path.extname(file) === ".md")
            .map(async file =>
                (await fs.readFile(path.join(postsPath, file))).toString(),
            ),
    )
    return files.map(content => matter(content) as Post)
}

export const getInformation = async (
    contentPath: string,
): Promise<Information> =>
    matter(
        (await fs.readFile(path.join(contentPath, "info.md"))).toString(),
    ) as Information
