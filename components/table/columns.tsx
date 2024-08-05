"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className='text-14-medium'>{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => (
      <p className='text-14-medium'>{row.original.patient.name}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className='min-w-[115px]'>
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Appointment
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className='text-14-regular min-w-[100px]'>
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => doc.name === row.original.primaryPhysician
      );
      return (
        <div className='flex items-center gap-3'>
          <Image
            src={doctor?.image}
            alt={doctor.name}
            width={100}
            height={100}
            className='size-8'
          />
          <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className='pl-4'>Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className='flex gap-1'>
          <AppointmentModal
            type='schedule'
            patientId={data.patient.$id}
            userId={data.userId}
            appointmentId={data}
            title='Schedule Appointment'
            decsription='Please confirm the following details to scheduled'
          />
          <AppointmentModal
            type='cancel'
            patientId={data.patient.$id}
            userId={data.userId}
            appointmentId={data}
            title='Cancel Appointment'
            decsription='Are you sure you want to cancel this appointment?'
          />
        </div>
      );
    },
  },
];
