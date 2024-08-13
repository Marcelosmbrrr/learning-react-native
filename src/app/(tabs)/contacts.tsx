import * as React from "react";
import { View } from "react-native";
import * as Contacts from "expo-contacts";
import { Feather } from "@expo/vector-icons";

import { Contact } from "@/components/contacts/types";

import { Input } from "@/components/input";
import { theme } from "@/theme";
import { ContactList } from "@/components/contacts";

export default function MyContacts() {
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === "granted") {
      //
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.Image],
      });

      if (data.length > 0) {
        //
        const filteredContacts = data.filter(
          (contact) =>
            contact.name &&
            contact.name.toLowerCase().includes(search.toLowerCase())
        );

        setContacts(filteredContacts as Contact[]);
      }
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Input style={{ marginBottom: -27 }}>
        <Feather
          name="search"
          size={16}
          color={theme.colors.blue}
          onPress={fetchData}
        />
        <Input.Field
          placeholder="Pesquisar por nome ..."
          onChangeText={setSearch}
          value={search}
          onSubmitEditing={fetchData}
        />
        <Feather
          name="x"
          size={16}
          color={theme.colors.blue}
          onPress={() => setSearch("")}
        />
      </Input>
      <ContactList contacts={contacts} />
    </View>
  );
}
