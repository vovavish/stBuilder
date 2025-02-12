import { NextResponse } from "next/server";
import { api } from "@/lib/api";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const response = await api.get(`/user-layouts/${params.id}`);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(error.response?.data || { message: "Error" }, { status: error.response?.status || 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();

  try {
    const response = await api.patch(`/user-layouts/${params.id}`, body);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(error.response?.data || { message: "Error" }, { status: error.response?.status || 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const response = await api.delete(`/user-layouts/${params.id}`);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(error.response?.data || { message: "Error" }, { status: error.response?.status || 500 });
  }
}
