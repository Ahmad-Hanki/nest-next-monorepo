"use server";
import { revalidateTag } from "next/cache";

export async function revalidateTagService(tag: string) {
  revalidateTag(tag, "default");
}
