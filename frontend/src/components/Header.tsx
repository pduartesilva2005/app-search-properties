import { ReactNode } from "react";

import styles from '../styles/components/Header.module.scss';

type HeaderProps = {
  children?: ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.topBar}>
        <h2>Search Properties</h2>

        <p>Tema Dark</p>
      </div>

      <div className={styles.headerContent}>
        {children}
      </div>
    </div>
  );
}