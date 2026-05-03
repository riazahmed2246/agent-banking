"use client";

import { AddCardDropdown } from "@/components/add-card-dropdown";
import { CardBrand, MemberRole } from "@/app/api/v1/data";

export default function DashboardPage() {
  const currentUser = {
    role: MemberRole.Admin, // or whatever role
  };

  const handleAddCard = ({ type }: { type: CardBrand }) => {
    console.log("Add card:", type);
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <AddCardDropdown
        currentUser={currentUser}
        handleAddCard={handleAddCard}
      />
    </div>
  );
}