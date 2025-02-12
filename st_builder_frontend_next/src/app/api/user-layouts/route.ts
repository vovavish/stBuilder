import { NextResponse } from "next/server";
import { api } from "@/lib/api";

// Получить все layouts
export async function GET() {
  try {
    const response = await api.get("/user-layouts/");
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(error.response?.data || { message: "Error" }, { status: error.response?.status || 500 });
  }
}

// Создать новый layout
export async function POST(req: Request) {
  const body = await req.json();

  try {
    const response = await api.post("/user-layouts/", body);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(error.response?.data || { message: "Error" }, { status: error.response?.status || 500 });
  }
}
