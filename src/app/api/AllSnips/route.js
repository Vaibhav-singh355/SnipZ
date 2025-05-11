
import code from "@/app/model/code"
import user from "@/app/model/user"
import {connect} from "@/app/db/db"
import { NextResponse } from "next/server"
connect()

export async function GET(request) {
    try {
        const {searchParams} = new URL(request.url)
        const id = searchParams.get("id")
        const list= await code.find({user:id}) 
        const per=await user.findById(id) 
        return NextResponse.json({ message: "Snips fetched successfully",data: list ,data1:per}, { status: 201 })
    
    
   

        
    } catch (error) {
        return NextResponse.json({ message: "Error adding Snip", error: error.message }, { status: 500 })
        
    }}
    