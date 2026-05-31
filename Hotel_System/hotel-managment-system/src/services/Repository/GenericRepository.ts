import fetchData from "./FetchAPI";
import type IGenericRepository from "./IGenericRepository";

export class GenericRepository<T> implements IGenericRepository<T> {
  protected apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async getAll(nameApi: string): Promise<T[]> {
    const data: T[] = await fetchData<T[]>(`${this.apiUrl}/${nameApi}`);
    return data;
  }
  async getById(nameApi: string, id: number | undefined): Promise<T> {
    const data: T = await fetchData<T>(`${this.apiUrl}/${nameApi}/${id}`);
    return data;
  }
  async create(nameApi: string, item: T): Promise<T> {
    const data: T = await fetchData<T>(`${this.apiUrl}/${nameApi}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    return data;
  }

  async update(nameApi: string, id: number | undefined, item: T): Promise<T> {
    const data: T = await fetchData<T>(`${this.apiUrl}/${nameApi}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    return data;
  }

  async delete(nameApi: string, id: number): Promise<boolean> {
    const data: boolean = await fetchData<boolean>(
      `${this.apiUrl}/${nameApi}/${id}`,
      {
        method: "DELETE",
      },
    );
    return data;
  }
  async count(
    nameApi: string,
    column: string,
    value: string,
    Operations: string,
  ): Promise<number> {
    const data: number = await fetchData<number>(
      column !== "" && value !== "" && Operations !== ""
        ? `${this.apiUrl}/${nameApi}/${column}/${value}/${Operations}`
        : `${this.apiUrl}/${nameApi}/${null}/${null}/${null}`,
    );
    return data;
  }
}
