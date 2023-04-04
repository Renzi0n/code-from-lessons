import { ReactNode } from 'react';

export interface LoaderProps {
  isLoading: boolean;
  children: ReactNode;
  variant?: 'dot' | 'circle';
}
