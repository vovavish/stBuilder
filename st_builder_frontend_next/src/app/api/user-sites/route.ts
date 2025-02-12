import { NextResponse } from "next/server";
import { api } from "@/lib/api";

// Получить все сайты пользователя
export async function GET() {
  try {
    const response = await api.get("/user-sites/getSites");
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(error.response?.data || { message: "Error" }, { status: error.response?.status || 500 });
  }
}

// Создать новый сайт
export async function POST(req: Request) {
  const body = await req.json();

  try {
    const response = await api.post("/user-sites/create", body);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(error.response?.data || { message: "Error" }, { status: error.response?.status || 500 });
  }
}
