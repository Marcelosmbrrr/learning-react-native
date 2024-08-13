export interface Contact {
  id: string;
  contactType: string;
  imageAvailable: boolean;
  name: string;
  firstName: string;
  image?: {
    uri: string;
  };
}

export interface ContactGroup {
  title: string;
  data: Contact[];
}
