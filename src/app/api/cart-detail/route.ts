import { GET_CART_ITEM } from "@/graphql";
import { bagistoFetch } from "@/utils/bagisto";
import { BagistoCartOperation } from "@/utils/bagisto/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const variables = {
      token: body.token ?? null,
    };

    const response = await bagistoFetch<BagistoCartOperation>({
      query: GET_CART_ITEM,
      variables : variables as any,
      cache: "no-store",
    });
    return Response.json({
      data: { ...response.body.data },
    });
  } catch (error) {
    return Response.json(
      {
        message: "Error querying the GraphQL API",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
