import { GET_THEME_CUSTOMIZATION } from "@/graphql";
import { graphqlRequest } from "../lib/graphql-fetch";
import RenderThemeCustomization from "@components/home/RenderThemeCustomization";

export const revalidate = 86400; 

export default async function Home() {
  const data = await graphqlRequest<any>(GET_THEME_CUSTOMIZATION, {}, {
    tags: ["theme-customization"],
    life: "days"
  });

  return (
    <main>
      <RenderThemeCustomization themeCustomizations={data?.themeCustomizations} />
    </main>
  );
}
