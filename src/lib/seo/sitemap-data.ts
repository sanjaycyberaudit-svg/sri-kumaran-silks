import { gql } from "@/gql";
import db, { isDatabaseConfigured } from "@/lib/supabase/db";
import { collections, products } from "@/lib/supabase/schema";
import { getClient } from "@/lib/urql";
import { eq } from "drizzle-orm";

const SitemapSlugsQuery = gql(/* GraphQL */ `
  query SitemapSlugsQuery {
    collectionsCollection(
      first: 100
      orderBy: [{ order: DescNullsLast }, { label: AscNullsLast }]
    ) {
      edges {
        node {
          slug
        }
      }
    }
    productsCollection(first: 500, orderBy: [{ created_at: DescNullsLast }]) {
      edges {
        node {
          slug
          created_at
        }
      }
    }
  }
`);

let graphqlSlugsPromise: ReturnType<typeof fetchSlugsViaGraphql> | null = null;

function loadGraphqlSlugs() {
  graphqlSlugsPromise ??= fetchSlugsViaGraphql();
  return graphqlSlugsPromise;
}

async function fetchSlugsViaGraphql() {
  try {
    const { data, error } = await getClient().query(SitemapSlugsQuery, {});
    if (error) {
      console.error("[sitemap] GraphQL failed:", error.message);
      return { collectionRows: [], productRows: [] };
    }

    const collectionRows =
      data?.collectionsCollection?.edges
        ?.map((edge) => ({ slug: edge.node.slug ?? "" }))
        .filter((row) => row.slug) ?? [];

    const productRows =
      data?.productsCollection?.edges
        ?.map((edge) => ({
          slug: edge.node.slug ?? "",
          createdAt: edge.node.created_at
            ? new Date(edge.node.created_at)
            : undefined,
        }))
        .filter((row) => row.slug) ?? [];

    return { collectionRows, productRows };
  } catch (err) {
    console.error("[sitemap] GraphQL fetch failed:", err);
    return { collectionRows: [], productRows: [] };
  }
}

export async function getPublishedProductSlugs() {
  if (isDatabaseConfigured()) {
    try {
      return await db
        .select({
          slug: products.slug,
          createdAt: products.createdAt,
        })
        .from(products)
        .where(eq(products.isDraft, false))
        .orderBy(products.createdAt);
    } catch (err) {
      console.error("[sitemap] DB product slugs failed:", err);
    }
  }

  const { productRows } = await loadGraphqlSlugs();
  return productRows;
}

export async function getCollectionSlugs() {
  if (isDatabaseConfigured()) {
    try {
      return await db
        .select({
          slug: collections.slug,
          label: collections.label,
        })
        .from(collections)
        .orderBy(collections.order);
    } catch (err) {
      console.error("[sitemap] DB collection slugs failed:", err);
    }
  }

  const { collectionRows } = await loadGraphqlSlugs();
  return collectionRows;
}
