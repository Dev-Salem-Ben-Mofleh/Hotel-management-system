import type { CreatePersonDto } from "../utils/AllInterfaces";
import { BASE_URL } from "../utils/constants";
import fetchData from "./Fetch";

export async function createPerson(newPerson: CreatePersonDto) {
  const data = await fetchData<CreatePersonDto>(`${BASE_URL}People/AddPerson`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPerson),
  });

  return data.personId;
}
