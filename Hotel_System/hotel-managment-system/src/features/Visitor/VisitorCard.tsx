import Field from "../../ui/Field";
import type { Person } from "../../services/models/Persons";
import type { Country } from "../../services/models/Country";
import { formatDate2 } from "../../utils/helpers";

export default function VisitorCard({
  visitorDetails,
  countries,
}: {
  visitorDetails: Person | undefined;
  countries: Country[];
}) {
  return (
    <div className="space-y-5">
      <Field
        FieldName="Visitor ID"
        icon="fas fa-id-card text-green-500"
        value={visitorDetails?.personId.toString()}
      />

      <Field
        FieldName="Phone"
        icon="fas fa-phone text-blue-500"
        value={visitorDetails?.phone}
      />
      <Field
        FieldName="Gender"
        icon="fas fa-user-tag text-purple-500"
        value={visitorDetails?.gender}
      />
      <Field
        FieldName="Birth Date"
        icon="fas fa-birthday-cake text-pink-500"
        value={formatDate2(visitorDetails?.birthDate)}
      />
      <Field
        FieldName="Country"
        icon="fas fa-globe text-indigo-500"
        value={
          countries.find(
            (country) =>
              country.countryId === visitorDetails?.nationalityCountryId
          )?.countryName
        }
      />
    </div>
  );
}
