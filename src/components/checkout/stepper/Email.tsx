"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EMAIL, getLocalStorage, setLocalStorage } from "@/store/local-storage";
import Link from "next/link";
import InputText from "@components/common/form/Input";
import { ProceedToCheckout } from "./ProceedToCheckout";
import { delay } from "@utils/helper";
import { EmailFormProps, EmailFormValues } from "../type";



const Email = () => {
  const email = getLocalStorage(EMAIL);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isGuest = true;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormValues>({
    defaultValues: { email },
  });

  const onSubmit = async (data: EmailFormValues) => {
    setLocalStorage(EMAIL, data?.email);
    await delay(200);
    router.push("/checkout?step=address");
  };

  return (
    <>
      {email === "" || typeof email === "object" ? (
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <EmailForm
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            isGuest={isGuest}
          />
        </form>
      ) : isOpen ? (
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <EmailForm
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            isGuest={isGuest}
          />
        </form>
      ) : (
        <div className="items- mt-4 flex flex-col justify-end gap-y-2 sm:flex-row sm:justify-between sm:gap-y-0">
          <div className="flex justify-between sm:justify-normal">
            <p className="w-auto text-base font-normal text-black/60 dark:text-white/60 sm:w-[192px]">
              Email Address
            </p>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="block cursor-pointer text-right text-base font-normal text-black/[60%] underline dark:text-neutral-300 sm:hidden"
            >
              Change
            </button>
            <p className="font-nor mal hidden text-base sm:block">{email}</p>
          </div>
          <p className="font-nor mal block text-base sm:hidden">{email}</p>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden cursor-pointer text-right text-base font-normal text-black/[60%] underline dark:text-neutral-300 sm:block"
          >
            Change
          </button>
        </div>
      )}
    </>
  );
};

export default Email;

function EmailForm({
  register,
  errors,
  isSubmitting,
  isGuest,
}: EmailFormProps) {
  return (
    <div>
      <InputText
        className="max-w-full"
        id="email"
        size="md"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email format",
          },
        })}
        errorMsg={errors?.email?.message as string}
        label="Enter Email *"
        placeholder="example@gmail.com"
        readOnly={!isGuest}
      />

      {isGuest && (
        <p className="mb-4 mt-6 font-outfit text-base font-normal text-black/[60%] dark:text-neutral-300">
          Already have an account? No worries, just{" "}
          <Link
            className="text-base font-normal text-primary"
            href="/customer/login"
          >
            log in.
          </Link>
        </p>
      )}

      <div className="mt-6 justify-self-end">
        <ProceedToCheckout buttonName="Next" pending={isSubmitting} />
      </div>
    </div>
  );
}
