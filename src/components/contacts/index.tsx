import React from "react";
import { useRouter } from "expo-router";
import { View, Text, FlatList, Pressable, Image } from "react-native";

import { theme } from "@/theme";

import { styles } from "./styles";
import { Contact, ContactGroup } from "./types";

function groupContactsByInitial(contacts: Contact[]): ContactGroup[] {

  const grouped: { [key: string]: Contact[] } = {};

  contacts.forEach((contact) => {
    const initial = contact.firstName
      ? contact.firstName[0].toUpperCase()
      : contact.name[0].toUpperCase();
    if (!grouped[initial]) {
      grouped[initial] = [];
    }
    grouped[initial].push(contact);
  });

  return Object.keys(grouped)
    .sort()
    .map((initial) => ({
      title: initial,
      data: grouped[initial],
    }));
}

export function ContactList(props: { contacts: Contact[] }) {
  const router = useRouter();
  const groupedContacts = groupContactsByInitial(props.contacts);

  return (
    <View style={styles.container}>
      <FlatList
        data={groupedContacts}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View>
            <View
              style={{
                width: "100%",
                paddingHorizontal: 10,
                backgroundColor: theme.colors.gray_100,
              }}
            >
              <Text style={styles.initial}>{item.title}</Text>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
              {item.data.map((contact, index) => (
                <Pressable key={index} style={styles.contactContainer} onPress={() => router.push(`/contact/${contact.id}`)}>
                  <Image
                    source={{
                      uri: "https://pbs.twimg.com/profile_images/1734753100420800512/m8ZS93rT_400x400.jpg",
                    }}
                    style={styles.photo}
                  />
                  <Text style={styles.contactName}>
                    {contact.name ? contact.name : contact.firstName}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
}
