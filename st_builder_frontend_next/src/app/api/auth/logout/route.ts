import { NextResponse } from "next/server";

export async function POST() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
  }

  return NextResponse.json({ message: "Logged out" });
}
