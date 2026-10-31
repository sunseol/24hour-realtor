import MainPage from "@/components/MainPage";
import { getListings, getSite } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [listings, site] = await Promise.all([getListings(), getSite()]);
  return <MainPage listings={listings} site={site} />;
}
