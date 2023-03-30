import React from 'react';
import './PageContainer.css';
import { PageContainerProps } from './PageContainer.types';

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return <div className={`container ${className}`}>{children}</div>;
}
