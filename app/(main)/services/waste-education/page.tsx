import axios from "axios";
import { formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FaSliders } from "react-icons/fa6";
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

export default async function WasteEducation() {
  const res = await axios.get(`${process.env.API_URL}/posts`);

  const posts = res.data.data as Post[];

  return (
    <div className="px-5">
      <Link href="/services" className="mb-4 flex items-center gap-1">
        <MdKeyboardArrowLeft className="text-primary" size={24} /> Back
      </Link>
      <div className="flex max-w-4xl justify-between">
        <h1 className="text-lg font-semibold">Waste Education</h1>
        <button className="text-primary mt-1">
          <FaSliders size={16} />
        </button>
      </div>

      <div className="grid max-w-4xl gap-4 py-5">
        {posts.map((post) => (
          <PostCard key={post.postId} {...post} />
        ))}
      </div>
    </div>
  );
}

function PostCard(post: Post) {
  return (
    <Link href={`/services/waste-education/${post.postId}`}>
      <div className="border-black-light flex justify-between rounded-xl border px-4 py-3">
        <div className="grid max-w-6/12 gap-2">
          <p className="text-white-darker text-xs">
            {post.topic || "Original Content"}
          </p>
          <p className="truncate text-xl font-bold">{post.title}</p>
          <p className="text-white-darker truncate text-sm">{post.content}</p>
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
            className="bg-white-dark size-[120px] rounded-lg object-cover"
          />
        ) : null}
      </div>
    </Link>
  );
}
