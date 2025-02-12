import { NextResponse } from "next/server";
import { api } from "@/lib/api";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const response = await api.get(`/user-sites/getSiteById/${params.id}`);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(error.response?.data || { message: "Error" }, { status: error.response?.status || 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();

  try {
    const response = await api.patch(`/user-sites/updateSiteById/${params.id}`, body);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(error.response?.data || { message: "Error" }, { status: error.response?.status || 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const response = await api.delete(`/user-sites/deleteSiteById/${params.id}`);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(error.response?.data || { message: "Error" }, { status: error.response?.status || 500 });
  }
}
