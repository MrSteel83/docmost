import { createContext, useContext, useEffect, useState } from "react";

export type CustomLink = {
  label: string;
  url: string;
  visibleIn?: string[];
  locale?: string;
};

const CustomLinksContext = createContext<CustomLink[] | null>(null);

export function CustomLinksProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<CustomLink[]>([]);

  useEffect(() => {
    fetch("custom-links.json")
      .then((res) => res.json())
      .then((data) => setLinks(Array.isArray(data) ? data : []))
      .catch(() => setLinks([]));
  }, []);

  return (
    <CustomLinksContext.Provider value={links}>
      {children}
    </CustomLinksContext.Provider>
  );
}

export function useCustomLinks(): CustomLink[] {
  return useContext(CustomLinksContext) ?? [];
}
