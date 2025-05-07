'use client';

import { useTranslation } from "react-i18next";
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider } from './color-mode';
export function Provider(props) {
  const {
    t
  } = useTranslation();
  return <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>;
}