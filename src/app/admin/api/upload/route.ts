import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "products";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPG, PNG, WebP, AVIF" },
        { status: 400 }
      );
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Max 10MB" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Convert to WebP with optimization
    const webpBuffer = await sharp(buffer)
      .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();

    // Generate SEO-friendly filename
    const originalName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const filename = `${originalName}-${Date.now()}.webp`;
    const filePath = `${folder}/${filename}`;

    // Upload to Supabase Storage
    const { error } = await supabase.storage
      .from("media")
      .upload(filePath, webpBuffer, {
        contentType: "image/webp",
        upsert: false,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("media").getPublicUrl(filePath);

    return NextResponse.json({
      url: publicUrl,
      path: filePath,
      width: 1200,
      height: 1200,
      format: "webp",
    });
  } catch {
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}

// DELETE image
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path");

    if (!path) {
      return NextResponse.json({ error: "Path required" }, { status: 400 });
    }

    const { error } = await supabase.storage.from("media").remove([path]);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error deleting file" },
      { status: 500 }
    );
  }
}
