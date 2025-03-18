import { columns } from "@/app/ui/invoices/columns";
import { InvoicesTable } from "@/app/ui/invoices/invoices-table";
import Search from "@/app/ui/search";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import { fetchFilteredInvoices } from "@/app/lib/data";
import { DataTable } from "@/app/ui/invoices/data-table";
import { lusitana } from "@/app/ui/fonts";
import Pagination from "@/app/ui/invoices/pagination";
import { fetchInvoicesPages } from "@/app/lib/data";

interface Invoice {
  id: string;
  name: string;
  email: string;
  amount: number;
  date: string;
  status: string;
  image_url: string;
}

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  const invoices = await fetchFilteredInvoices(query, currentPage);
  console.log("Dados recebidos:", invoices[0]);

  return (
    <div>
      <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search />
        <CreateInvoice />
      </div>

      <div className="gap-4 mt-4">
        <InvoicesTable data={invoices} />
      </div>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
