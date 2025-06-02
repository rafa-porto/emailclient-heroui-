"use client";

import React, { Suspense } from "react";
import Inbox from "@/components/inbox";

export const dynamic = "force-dynamic";

const DashboardPage = () => {
  return (
    <Suspense fallback={null}>
      <div className="h-full w-full">
        <Inbox />
      </div>
    </Suspense>
  );
};

export default DashboardPage;
