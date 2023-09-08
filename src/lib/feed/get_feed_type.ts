export interface Feed {
  title: string;
  link: string;
  description: string;
  language: null;
  copyright: null;
  managing_editor: null;
  webmaster: null;
  pub_date: string | null;
  last_build_date?: string;
  categories: any[];
  generator: null;
  docs: null;
  cloud: null;
  rating: null;
  ttl: null;
  image: null;
  text_input: null;
  skip_hours: any[];
  skip_days: any[];
  items: Item[];
  extensions: NamespacesClass;
  itunes_ext: null;
  dublin_core_ext: null;
  syndication_ext: null;
  namespaces: NamespacesClass;
}

export interface NamespacesClass {}

export interface Item {
  title: string;
  link: string;
  description: string;
  author: string | null;
  categories: Category[] | null | undefined;
  comments: string[] | null | undefined;
  enclosure: string | null | undefined;
  guid: GUID;
  pub_date: string;
  source: null;
  content: null;
  extensions: ItemExtensions;
  itunes_ext: null;
  dublin_core_ext: null;
  image?: string;
}

export interface Category {
  name: string;
  domain: null;
}

export interface ItemExtensions {
  dc: Dc;
}

export interface Dc {
  creator: Creator[];
}

export interface Creator {
  name: string;
  value: string;
  attrs: Attrs;
  children: NamespacesClass;
}

export interface Attrs {
  "xmlns:dc": string;
}

export interface GUID {
  value: string;
  permalink: boolean;
}
