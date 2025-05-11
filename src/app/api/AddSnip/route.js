import user from "@/app/model/user";
import code from "@/app/model/code";
import mongoose from "mongoose";
import { connect } from "@/app/db/db";
import { NextResponse } from "next/server";
connect();

export async function POST(request) {
    try {
        const reqbody = await request.json();
        const { title, description, body, id } = reqbody;

        // Validate required fields
        if (!title || !description || !body || !id) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Validate user ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
        }

        const existingUser = await user.findById(id);

        // Handle non-existent user
        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Ensure existingUser.list is initialized
        if (!Array.isArray(existingUser.list)) {
            existingUser.list = [];
        }

        const snip = new code({
            title: title,
            description: description,
            body: body,
            user: existingUser
        });

        await snip.save();
        existingUser.list.push(snip);
        await existingUser.save();

        return NextResponse.json({ message: "Adding Snippet", snip }, { status: 201 });

    } catch (error) {
        console.error("Error adding Snip:", error); // Log the error for debugging
        return NextResponse.json({ message: "Error adding Snip", error: error.message }, { status: 500 });
    }
}