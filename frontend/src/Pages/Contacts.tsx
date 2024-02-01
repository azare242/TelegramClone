import React from "react";
import ContactList from "../Components/Contacts/ContactList";
import { Button, IconButton, TextField, Modal, Typography, Box } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useAPI } from "../Actions/API/useAPI";
import { toast } from "react-toastify";

const Contacts: React.FC = () => {

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [username, setUsername] = React.useState<string>('');

  const {addContact} = useAPI()
  const addContactHandle = async () => {
    const res = addContact === null ? {success: false, message: "unknown error", data:undefined} : await addContact(username);

    if (res.success) toast.success("Contact Added Successfully")
    setOpenModal(false)

  }

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
        <Button variant="contained" onClick={handleOpenModal}>Add Contacts</Button>
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            
          }}
        >
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            add contact
          </Typography>
          
          <div className='flex flex-col gap-2 items-center justify-center'>
            <TextField label={"Username"} color={`primary`} onChange={(e) => setUsername(e.target.value)} value={username}>

            </TextField>
          <Button variant='contained' color="primary" onClick={addContactHandle}>
            add
          </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Contacts;
