"use server";

import { ID } from "node-appwrite";
import {
  DATABASE_ID,
  databases,
  APPOINTMENT_COLLECTION_ID,
} from "../appwrite.config";
import { parseStringify } from "../utils";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  console.log("appointment", appointment);
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );
    console.log("newAppointment", newAppointment);
    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};
