import * as React from 'react';
import * as Contacts from "expo-contacts";

import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export interface ContactType {
  id: string;
  contactType: string;
  imageAvailable: boolean;
  name: string;
  firstName: string;
  image?: {
    uri: string;
  };
}

export default function Contact() {
  const { id } = useLocalSearchParams(); // Recebe o ID do contato
  const [contact, setContact] = React.useState<ContactType | null>(null);

  React.useEffect(() => {
    if (id) {
      fetchContactDetails(id as string);
    }
  }, [id]);

  async function fetchContactDetails(id: string) {
    try {
      const contactData = await Contacts.getContactByIdAsync(id, [
        Contacts.Fields.Name,
        Contacts.Fields.Image,
        Contacts.Fields.FirstName,
        Contacts.Fields.ContactType,
      ]);

      if (contactData) {
        // Mapeia os dados do contato obtidos para a interface ContactType
        const fetchedContact: ContactType = {
          id: contactData.id,
          contactType: contactData.contactType,
          name: contactData.name,
          firstName: contactData.firstName || "",
        };

        setContact(fetchedContact);
      } else {
        console.warn("Contato não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar os detalhes do contato:", error);
    }
  }

  return (
    <View style={styles.container}>
      {contact ? (
        <>
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.contactType}>
            Tipo de Contato: {contact.contactType}
          </Text>
          <Text style={styles.contactFirstName}>
            Nome: {contact.firstName ?? contact.name}
          </Text>
        </>
      ) : (
        <Text>Carregando detalhes do contato...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  contactImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  contactName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contactType: {
    fontSize: 18,
    marginBottom: 5,
  },
  contactFirstName: {
    fontSize: 18,
    marginBottom: 5,
  },
});
