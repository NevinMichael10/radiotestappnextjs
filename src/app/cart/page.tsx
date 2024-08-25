import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Cart from "@/components/Cart/Cart";

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const CartPage = () => {
  return (
    <DefaultLayout>
      <Cart/>
    </DefaultLayout>
  );
};

export default CartPage;
