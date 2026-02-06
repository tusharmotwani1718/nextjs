import { Suspense } from "react";
import DynamicData from "./_components/DynamicData.jsx";
import StaticData from "./_components/StaticData.jsx";

export default function Home() {
  return (
    <>
      <StaticData />
      <Suspense fallback={<p>Loading...</p>}>
        <DynamicData />
      </Suspense>
    </>
  );
}
