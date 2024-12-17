'use client';

import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import { Skeleton } from "antd";

export default function Page() {

  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, [router]);

  return (
    <Skeleton active />
  );
}
