import React from "react";
import ContactItem from "./ContactItem";



  
  const ContactList: React.FC<{contactItems:  {
    id: number;
    username: string;
    avatarSrc: string;
    phone: string
  }[]}> = ({ contactItems }) => {
    return (
      <div className="flex flex-col gap-0 overflow-y-auto rounded-lg h-[500px] w-full">
        {contactItems.map((contactItem) => (
          <ContactItem
            key={contactItem.id} 
            username={contactItem.username}
            avatarSrc={contactItem.avatarSrc}
            phone={contactItem.phone}
          />
        ))}
      </div>
    );
  };
  
  export default ContactList;