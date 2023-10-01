import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { FaPlus } from 'react-icons/fa6';
import { Container, Title, SubTitle, EmptyContactListText } from './App.styled';
import Modal from 'components/Modal';
import IconButton from './IconButton/IconButton';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  //* додавання нового контакту з перевіркою на наявність контактів з таким ім'ям
  addContact = contact => {
    const isInContacts = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isInContacts) {
      alert(`${contact.name} is already in  contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      ...contact,
    };
    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));

    this.toggleModal();
  };

  //* фільтр пошуку за ім'ям
  //обробник зміни значення поля вводу фільтра
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  //функція для відображення знайдених за фільтром контактів
  getFoundContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  //* видалення контакту
  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== contactId),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter, showModal } = this.state;

    const foundContacts = this.getFoundContacts();

    return (
      <Container>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <ContactForm onAddContact={this.addContact} />
          </Modal>
        )}

        <Title children="Phonebook" />
        <IconButton onClick={this.toggleModal}>
          <FaPlus size="2em" />
        </IconButton>

        <SubTitle children="Contacts" />

        {contacts.length > 0 ? (
          //* Фільтр рендеримо тільки, якщо масив контактів не порожній
          <Filter value={filter} onChange={this.changeFilter} />
        ) : (
          <EmptyContactListText children="There are no contacts." />
        )}

        <ContactList
          contacts={foundContacts}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}
