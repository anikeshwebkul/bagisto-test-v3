import { NextRequest } from "next/server";

import { bagistoFetch } from "@/utils/bagisto";
import { BagistoUpdateCartOperation } from "@/utils/bagisto/types";
import { isBagistoError } from "@/utils/type-guards";
import { UPDATE_CART_ITEM } from "@/graphql";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const variables = {
      token : body.token ?? null,
      cartItemId: body.cartItemId,
      quantity: body.quantity,
    };
    

    const res = await bagistoFetch<BagistoUpdateCartOperation>({
      query: UPDATE_CART_ITEM,
       variables : variables as any,
      cache: "no-store",
    });

     return Response.json({
      data: { ...res?.body.data },
    });

  } catch (error: any) {
    if (isBagistoError(error)) {
      return Response.json(
        {
          data: { createAddProductInCart: null },
          error: error.cause ?? error,
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        message: "Network error",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
