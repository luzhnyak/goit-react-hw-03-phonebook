import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Section } from './Section/Section';
import { Container } from './App.styled';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  isNameHas = name => {
    return this.state.contacts.some(contact => contact.name === name);
  };

  onSubmit = data => {
    data.id = nanoid();
    this.setState(prevState => {
      return { contacts: [...prevState.contacts, { ...data }] };
    });
  };

  onDelete = id => {
    const data = this.state.contacts.filter(contact => contact.id !== id);
    this.setState({ contacts: [...data] });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  filterContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  render() {
    return (
      <Container>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.onSubmit} isNameHas={this.isNameHas} />
        </Section>

        <Section title="Contacts">
          {this.state.contacts.length !== 0 && (
            <Filter filter={this.state.filter} onChange={this.handleChange} />
          )}
          <ContactList
            contacts={this.filterContacts()}
            onDelete={this.onDelete}
          />
        </Section>
      </Container>
    );
  }
}
