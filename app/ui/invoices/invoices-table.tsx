"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { UpdateInvoice, DeleteInvoice } from "@/app/ui/invoices/buttons";
import InvoiceStatus from "@/app/ui/invoices/status";
import { ArrowUpDown } from "lucide-react"; // Importe o ícone de ordenação

// Tipo que representa os dados da fatura
interface Invoice {
  id: string;
  name: string;
  email: string;
  amount: number;
  date: string;
  status: string;
  image_url: string;
}

// Definição das colunas com os cabeçalhos desejados
const columns: ColumnDef<Invoice, any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Customer
        <ArrowUpDown className="ml-1 h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const image_url = row.original.image_url;

      return (
        <div className="flex items-center gap-3">
          {image_url && (
            <img
              src={image_url}
              alt={`${name}'s avatar`}
              className="w-8 h-8 rounded-full"
            />
          )}
          <span>{name}</span>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-1 h-4 w-4" />
      </button>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount
        <ArrowUpDown className="ml-1 h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const dollars = amount / 100;

      return (
        <div className="text-left">
          $
          {dollars.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="ml-1 h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      // Converte a string de data para objeto Date
      const date = new Date(row.getValue("date"));

      // Formata a data para formato local
      const formatted = new Intl.DateTimeFormat("En-us", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date);

      return <div>{formatted}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-1 h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      return <InvoiceStatus status={row.getValue("status")} />;
    },
    enableSorting: true,
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const invoice = row.original;
      return (
        <div className="flex justify-end gap-2">
          <UpdateInvoice id={invoice.id} />
          <DeleteInvoice id={invoice.id} />
        </div>
      );
    },
    enableSorting: false,
  },
];

export function InvoicesTable({ data }: { data: Invoice[] }) {
  return <DataTable columns={columns} data={data} />;
}
