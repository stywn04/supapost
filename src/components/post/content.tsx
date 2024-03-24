"use client";

import { useRouter } from "next/navigation";

interface PostContentProps {
  image: string | null;
  content: string;
  post_id: string;
}

export function PostContent({ image, content, post_id }: PostContentProps) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/post/${post_id}`);
      }}
      className={`py-5 whitespace-pre-line cursor-pointer`}
    >
      {image ? (
        <img
          src={image}
          alt={content}
          className="w-full h-full rounded-md mb-2"
        />
      ) : null}
      <p className="line-clamp-3">{content}</p>
    </div>
  );
}
