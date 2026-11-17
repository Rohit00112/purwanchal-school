import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import sharp from "sharp";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB

export async function POST(req: NextRequest) {
  try {
    // 1. Verify Authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in to upload files." },
        { status: 401 }
      );
    }

    // 2. Parse Form Data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file was uploaded." },
        { status: 400 }
      );
    }

    // 3. Validate File Type
    if (!ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file type. Only JPG, PNG, WebP, GIF, and AVIF images are permitted.",
        },
        { status: 400 }
      );
    }

    // 4. Validate Size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: "File size exceeds 8MB limit. Please upload a smaller image.",
        },
        { status: 400 }
      );
    }

    // 5. Ensure Upload Directory Exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // 6. Process & Optimize Image with Sharp
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uniqueId = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;

    let finalFilename = `${uniqueId}.webp`;
    let finalPath = path.join(uploadDir, finalFilename);

    try {
      if (file.type === "image/gif") {
        // Keep GIF animated without WebP conversion
        finalFilename = `${uniqueId}.gif`;
        finalPath = path.join(uploadDir, finalFilename);
        await fs.promises.writeFile(finalPath, buffer);
      } else {
        // Optimize to high-quality responsive WebP
        await sharp(buffer)
          .rotate() // auto-orient EXIF
          .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
          .webp({ quality: 82, effort: 4 })
          .toFile(finalPath);
      }
    } catch (sharpError) {
      console.warn("[Upload Sharp Warning, writing raw file]", sharpError);
      const safeExt = path.extname(file.name).toLowerCase() || ".jpg";
      finalFilename = `${uniqueId}${safeExt}`;
      finalPath = path.join(uploadDir, finalFilename);
      await fs.promises.writeFile(finalPath, buffer);
    }

    const publicUrl = `/uploads/${finalFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: finalFilename,
      size: file.size,
    });
  } catch (error: any) {
    console.error("[Upload API Error]", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "An unexpected error occurred while processing the upload.",
      },
      { status: 500 }
    );
  }
}
