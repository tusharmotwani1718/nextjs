import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      Advanced Routing in Nextjs
      
      <div className="my-3">
        <Link href={'/blog/123'}
      className="bg-white text-black rounded-xl py-1 px-3 my-3"
      >
        Visit Blog: 123
      </Link>
      </div>
    </div>
  );
}
