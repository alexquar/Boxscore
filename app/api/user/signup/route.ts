// route that takes in user signup data and additional info and create a db entry 

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // no need to worry about signup we need to create a db entry 
  }