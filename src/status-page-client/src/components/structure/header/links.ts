import { useMemo } from 'react';

const links = [
  { translationKey: 'New Virtual Chain', url: '/new_vc' },
  { translationKey: 'Existing Virtual Chain', url: '/existing_vc' },
  { translationKey: 'Recover Virtual Chain', url: '/recover_vc' },
];

export type TLinkDescriptor = {
  label: string;
  url: string;
};

export const useLinkDescriptors = () => {
  const linkDescriptors = useMemo<TLinkDescriptor[]>(() => {
    return links.map((link) => ({
      // TODO : O.L : Add translations
      url: link.url,
      label: link.translationKey,
    }));
  }, []);

  return linkDescriptors;
};
