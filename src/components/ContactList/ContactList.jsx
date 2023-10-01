import React from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import IconButton from 'components/App/IconButton/IconButton';
import { Contacts, ContactItem, Text } from './ContactList.styled';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <Contacts>
      {contacts.map(({ id, name, number }) => (
        <ContactItem key={id}>
          <Text>
            {name} : {number}
          </Text>
          <IconButton type="button" onClick={() => onDeleteContact(id)}>
            <FaRegTrashCan />
          </IconButton>
        </ContactItem>
      ))}
    </Contacts>
  );
};

export default ContactList;
