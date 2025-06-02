"use client";

import React from "react";
import Inbox from "@/components/inbox";

export const dynamic = "force-dynamic";

const DashboardPage = () => {
  return (
    <div className="h-full w-full">
      <Inbox />
    </div>
  );
};

export default DashboardPage;
