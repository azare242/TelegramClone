import React from "react";
import ContactList from "../Components/Contacts/ContactList";
import { Button, IconButton, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

const Contacts: React.FC<{ x: number }> = ({ x }) => {
  return (
    <div className="flex flex-col rounded-2xl border-blue-500 bg-white/70 backdrop-blur-sm mt-[100px]">
      <div className="flex items-center justify-between p-4">
        <TextField label={"Search"} color={`primary`} />
        <IconButton>
          <Search />
        </IconButton>
      </div>

      <ContactList
        contactItems={[
          {
            id: 1,
            username: "Alireza",
            avatarSrc: "",
            phone: "+989123456789",
          },
          {
            id: 2,
            username: "Alireza",
            avatarSrc: "",
            phone: "+989123456789",
          },
          {
            id: 3,
            username: "Alireza",
            avatarSrc: "",
            phone: "+989123456789",
          },
          {
            id: 4,
            username: "Alireza",
            avatarSrc: "",
            phone: "+989123456789",
          },
          {
            id: 5,
            username: "Alireza",
            avatarSrc: "",
            phone: "+989123456789",
          },
          {
            id: 6,
            username: "Alireza",
            avatarSrc: "",
            phone: "+989123456789",
          },
          {
            id: 7,
            username: "Alireza",
            avatarSrc: "",
            phone: "+989123456789",
          },
          {
            id: 8,
            username: "Alireza",
            avatarSrc: "",
            phone: "+989123456789",
          },
        ]}
      />
      <div className="flex items-center justify-center p-4">
        <Button>Add Contacts</Button>
      </div>
    </div>
  );
};

export default Contacts;
