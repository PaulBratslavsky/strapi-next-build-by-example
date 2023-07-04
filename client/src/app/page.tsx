export async function getPageBySlug(slug: string) {
  const BASE_URL = process.env.STRAPI_BASE_URL || "http://localhost:1337";
  const QUERY = `?filters[slug]=${slug}`;

  const res = await fetch(`${BASE_URL}/api/pages${QUERY}`);
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to fetch API");
  console.log(data, "FROM GET PAGE BY SLUG");
  return data;
}

export default async function HomeRoute() {
  const data = await getPageBySlug("home");
  const pageData = data.data[0];
  console.log(pageData, "FROM HOME ROUTE SERVER COMPONENT");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-center">
        We will do something here
      </h1>
      <h1 className="text-4xl font-bold">{pageData.attributes.title}</h1>
      <p className="text-xl">{pageData.attributes.description}</p>
    </main>
  );
}
