import { useState } from "react";
import { visitorSchema, type VisitorFormValues } from "./VisitorValidation";
import { useAddVisistor } from "./VisitorHooks/useAddVisistor";
import { useModuleContext } from "../../context/Hook/useModuleContext";
import { formatDate1 } from "../../utils/helpers";
import type { Person } from "../../services/models/Persons";
import Label from "../../ui/Label";
import Error from "../../ui/Error";
import CancelButton from "../../ui/CancelButton";

export default function VisitorModal({
  onSelect,
  personName,
}: {
  onSelect: (personId: string) => void;
  personName: string;
}) {
  const { isPending, AddVisitorAsync } = useAddVisistor();
  const { onCloseNestedModalModule, countries } = useModuleContext();
  const [values, setValues] = useState<VisitorFormValues>({
    fullName: personName || "",
    phone: "",
    gender: "1",
    nationalityCountryId: "",
    birthDate: new Date(),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const InputClassName = `w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500${
    isPending ? "cursor-not-allowed opacity-60" : "cursor-pointer"
  }`;
  const SelectClassName =
    "  w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparenttransition";
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    try {
      await visitorSchema.validate(values, { abortEarly: false });

      setErrors({});

      const newVisitor: Person = {
        personId: 0,
        ...values,
        nationalityCountryId: +values.nationalityCountryId,
        birthDate: formatDate1(values.birthDate),
      };

      AddVisitorAsync(
        { newVisitor },
        {
          onSuccess: (res) => {
            onSelect(res.personId?.toString() || "");
            onCloseNestedModalModule?.();
          },
        },
      );
    } catch (err: any) {
      const validationErrors: Record<string, string> = {};
      err.inner.forEach((e: { path: string; message: string }) => {
        validationErrors[e.path] = e.message;
      });
      setErrors(validationErrors);
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label name="Full Name" />
          <input
            className={InputClassName}
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            disabled={isPending}
          />
          {errors.fullName && <Error message={errors.fullName} />}
        </div>

        <div>
          <Label name="Phone" />
          <input
            className={InputClassName}
            name="phone"
            value={values.phone}
            onChange={handleChange}
          />
          {errors.phone && <Error message={errors.phone} />}
        </div>

        <div>
          <Label name="Gender" />
          <select
            name="gender"
            value={values.gender}
            onChange={handleChange}
            className={SelectClassName}
          >
            <option value="">Select</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>
          {errors.gender && <Error message={errors.gender} />}
        </div>

        <div>
          <Label name="Country" />
          <select
            name="nationalityCountryId"
            value={values.nationalityCountryId}
            onChange={handleChange}
            className={SelectClassName}
          >
            <option value="">Select</option>
            {countries.map((c) => (
              <option key={c.countryId} value={c.countryId}>
                {c.countryName}
              </option>
            ))}
          </select>
          {errors.nationalityCountryId && (
            <Error message={errors.nationalityCountryId} />
          )}
        </div>

        <div>
          <Label name="Birth Date" />
          <input
            className={InputClassName}
            type="date"
            name="birthDate"
            value={values.birthDate}
            onChange={handleChange}
          />
          {errors.birthDate && <Error message={errors.birthDate} />}
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <CancelButton
          isPending={isPending}
          onCloseModule={onCloseNestedModalModule}
        />
        <button
          onClick={handleSave}
          disabled={isPending}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
        >
          <i className="fas fa-save mr-2"></i>
          {isPending ? "Saving..." : "Add Visitor"}
        </button>
      </div>
    </>
  );
}
