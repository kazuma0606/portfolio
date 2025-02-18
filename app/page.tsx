import { redirect } from "next/navigation";

export default function Home() {
  redirect("/portfolio"); // `/portfolio` にリダイレクト
  return null; // 何も表示しない
}
