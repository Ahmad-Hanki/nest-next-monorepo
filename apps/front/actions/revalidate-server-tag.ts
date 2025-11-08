"use server";
import { revalidateTag } from "next/cache";

export async function revalidateTagService(tag: string) {
  // @ts-ignore
  revalidateTag(tag);
}
