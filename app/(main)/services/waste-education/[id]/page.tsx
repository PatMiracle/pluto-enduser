import axios from "axios";
import { formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { MdCalendarToday, MdKeyboardArrowLeft } from "react-icons/md";

interface Post {
  dateCreated: string;
  lastModified: string;
  postId: number;
  assets: [
    {
      postMediaCode: string;
      media: string;
      mediaURL: string;
    },
  ];
  title: string;
  content: string;
  topic: string;
  audience: {
    forClients: boolean;
    forStateManagers: boolean;
    forAreaManagers: boolean;
    forZonalManagers: boolean;
    forServiceProviders: boolean;
    forDrivers: boolean;
  };
  status: "PUBLISHED";
}

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const res = await axios.get(
    `${process.env.API_URL}/posts/${(await params).id}`,
  );

  const post = res.data as Post;

  return (
    <div className="px-5">
      <Link
        href="/services/waste-education"
        className="mb-4 flex items-center gap-1"
      >
        <MdKeyboardArrowLeft className="text-primary" size={24} /> Back
      </Link>
      <div className="max-w-4xl">
        <h1 className="text-4xl font-semibold">{post.title}</h1>
        <div className="mt-2 mb-4 flex items-center justify-between">
          <p className="text-white-darker text-xs">
            {post.topic || "Original Content"}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <MdCalendarToday />
            <span className="mt-1">
              {formatDate(post.dateCreated, "dd/MM/yyyy")}
            </span>
          </p>
        </div>
        {post.assets.length > 0 ? (
          <Image
            src={post.assets[0].mediaURL}
            alt=""
            width={500}
            height={500}
            className="bg-white-dark h-[400px] w-full rounded-lg object-contain"
          />
        ) : null}

        <article className="pt-5">
          <p className="">{post.content}</p>
        </article>
      </div>
    </div>
  );
}
