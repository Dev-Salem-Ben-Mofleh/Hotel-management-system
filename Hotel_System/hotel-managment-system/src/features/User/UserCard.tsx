import Field from "../../ui/Field";
import type { User } from "../../services/models/User";

export default function UserCard({
  userDetails,
}: {
  userDetails: User | undefined;
}) {
  return (
    <div className="space-y-5">
      <Field
        FieldName="User ID"
        icon="fas fa-id-card text-green-500"
        value={userDetails?.userId.toString()}
      />
      <Field
        FieldName="Email"
        icon="fas fa-envelope text-blue-500"
        value={userDetails?.email}
      />
    </div>
  );
}
