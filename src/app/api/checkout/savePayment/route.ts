import { NextResponse } from "next/server";
import { bagistoFetch } from "@/utils/bagisto";
import { isBagistoError } from "@/utils/type-guards";
import { CREATE_CHECKOUT_PAYMENT_METHODS } from "@/graphql";

export async function POST(req: Request) {
  try {
     const body = await req.json();

    const variables = {
      token : body.token,
      paymentMethod: body.paymentMethod ,
      successUrl :  "https://myapp.com/payment/success" , 
      failureUrl : "https://myapp.com/payment/failure",
      cancelUrl : "https://myapp.com/payment/cancel"
    }

    const res = await bagistoFetch<any>({
      query: CREATE_CHECKOUT_PAYMENT_METHODS,
      variables: variables as any ,
      cache: "no-store",
    });

     return NextResponse.json({ data: res?.body?.data}, { status: 200 });
  } catch (error) {
    if (isBagistoError(error)) {
      return NextResponse.json(
        {
          data: { saveShipping: null },
          error: { ...error.cause },
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}