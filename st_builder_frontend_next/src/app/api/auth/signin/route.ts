import { NextResponse } from "next/server";
import { api } from "@/lib/api";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const response = await api.post("/auth/local/signin", body);
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", response.data.token);
    }

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(error.response?.data || { message: "Error" }, { status: error.response?.status || 500 });
  }
}
