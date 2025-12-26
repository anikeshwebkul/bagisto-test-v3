import { CREATE_CART_TOKEN } from "@/graphql";
import { bagistoFetch } from "@/utils/bagisto";
import { isBagistoError } from "@/utils/type-guards";

interface CreateCartTokenResponse {
  createCartToken: {
    cartToken: {
      id: number;
      _id: string;
      cartToken: string;
      sessionToken: string;
      success: boolean;
      message: string;
      isGuest: boolean;
    };
  };
}


export async function POST() {
  try {
    const res = await bagistoFetch<{ data: CreateCartTokenResponse }>({
  query: CREATE_CART_TOKEN,
  variables: {} as any,
  cache: "no-store",
});


    return Response.json({
      data: { ...res?.body.data },
    });
  } catch (error) {
    if (isBagistoError(error)) {
      return Response.json(
        {
          data: { createCartToken: null },
          error,
        },
        { status: 200 }
      );
    }

    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}
