import { NextResponse } from "next/server";
import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ApiErrorResponse";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const response = await api.post("/auth/local/signup", body);
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    const err = error as AxiosError<ApiErrorResponse>;
    return NextResponse.json(err.response?.data || { message: "Error" }, { status: err.response?.status || 500 });
  }
}
