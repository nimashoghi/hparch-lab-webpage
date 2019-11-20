import {promises as fs} from "fs"
import matter from "gray-matter"
import path from "path"
import React from "react"
import ReactMarkdown from "react-markdown"

export function assert(input: unknown): asserts input {
    if (!input) {
        throw new Error("Failed assertion")
    }
}

export type Post = matter.GrayMatterFile<string> & {
    data: {
        title: string
    }
}

export const getPosts = async (mdPath: string): Promise<Post[]> => {
    const files = await Promise.all(
        (await fs.readdir(mdPath))
            .filter(file => path.extname(file) === ".md")
            .map(async file =>
                (await fs.readFile(path.join(mdPath, file))).toString(),
            ),
    )
    return files.map(content => matter(content) as Post)
}

export interface PostProps {
    posts?: Post[]
}
export const Posts: React.FC<PostProps> & {
    getInitialProps: () => Promise<PostProps>
} = ({posts}) => {
    assert(posts)

    return (
        <div>
            {posts.map((post, i) => (
                <article key={i}>
                    <h1>{post.data.title}</h1>
                    <div>
                        <ReactMarkdown source={post.content} />
                    </div>
                </article>
            ))}
        </div>
    )
}
Posts.getInitialProps = async () => ({
    posts: await getPosts("/workspaces/hparch-lab-webpage/posts/"),
})

export default Posts
