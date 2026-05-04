"use client";

import { SqlTable } from "@/components/sql-table";

export default function Dashboard() {
  const databaseStructure = {
    users: [
      { name: "id", type: "INT" },
      { name: "name", type: "VARCHAR(255)" },
      { name: "email", type: "VARCHAR(255)" },
    ],
    posts: [
      { name: "id", type: "INT" },
      { name: "title", type: "TEXT" },
      { name: "user_id", type: "INT" },
    ],
      comments: [
      { name: "id", type: "INT" },
      { name: "content", type: "TEXT" },
      { name: "post_id", type: "INT" },
      { name: "user_id", type: "INT" },
    ],
  };

  return (
    <main className="p-6">
      <SqlTable databaseStructure={databaseStructure} />
    </main>
  );
}