import type { ContactProps } from "../utils/AllInterfaces";

function ContactList({ Contacts = [] }: ContactProps) {
  return Contacts.map((contact) => (
    <div
      key={contact.primaryInfo}
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 gradient-gold rounded-full flex items-center justify-center">
          <span className="text-white text-xl">{contact.emoji}</span>
        </div>
        <div>
          <h3 className="font-bold text-yellow-700">{contact.primaryInfo}</h3>
          <p className="text-gray-600">{contact.secondaryInfo}</p>
        </div>
      </div>
    </div>
  ));
}

export default ContactList;
