import NavBar from '@components/Navbar';
import { PropsWithChildren } from 'react';

export default function IndexTemplate({ children }: PropsWithChildren) {
  // TODO: analyze page events here
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}
