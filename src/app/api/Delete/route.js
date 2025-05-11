import { connect } from "@/app/db/db";
import code from "@/app/model/code";
import user from "@/app/model/user";
import { NextResponse } from "next/server";

connect();

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const uid = searchParams.get("uid");
    
    if (!id) {
      return NextResponse.json({ success: false, message: "Missing code ID" }, { status: 400 });
    }

    if (!uid) {
      return NextResponse.json({ success: false, message: "Missing user ID" }, { status: 400 });
    }

    const deleted = await code.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, message: "Code not found" }, { status: 404 });
    }

    const existingUser = await user.findById(uid);

    if (!existingUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    await existingUser.list.pull(id);
    await existingUser.save();

    return NextResponse.json({ success: true, message: "Deleteing Snippet" });
  } catch (error) {
    console.error("Error in DELETE function:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}