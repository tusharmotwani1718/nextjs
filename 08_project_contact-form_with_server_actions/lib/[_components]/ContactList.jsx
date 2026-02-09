import { getContact } from '../../server-actions/get-contacts';
import ContactCard from './ContactCard';

async function ContactList() {
    const contacts = await getContact();

    if (!contacts.success) {
        return <p className="text-red-500">Failed to load contacts</p>;
    }

    return (
        <div className="flex max-w-7xl mx-auto gap-4 flex-wrap min-h-screen items-center justify-center">
            {contacts.data.map((contact) => (
                <ContactCard key={contact._id} contact={contact} />
            ))}
        </div>
    );
}

export default ContactList;
