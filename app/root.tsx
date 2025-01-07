import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import styles from '~/styles/main.css';
import MainNavigation from "~/components/MainNavigation";

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"> 
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <html>
        <head>
          <title>Oh no!</title>
          <Meta />
          <Links />
        </head>
        <body>
        <main className="error">
          <h1>Error: {error?.data}</h1>
          <p>Oh no! Something went wrong!</p>
          <p>Back to <Link to="/">safety</Link></p>
        </main>
        <Scripts />
        </body>
      </html>
    );
  } else if (error instanceof Error) {
    return (
      <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
      <main className="error">
        <h1>Error: {error?.message}</h1>
        <p>Oh no! Something went wrong!</p>
        <p>Back to <Link to="/">safety</Link></p>
      </main>
      <Scripts />
      </body>
    </html>
    );
  } else {
    <html>
        <head>
          <title>Oh no!</title>
          <Meta />
          <Links />
        </head>
        <body>
        <main className="error">
          <h1>Unknown Error</h1>
          <p>Oh no! Something went wrong!</p>
          <p>Back to <Link to="/">safety</Link></p>
        </main>
        <Scripts />
        </body>
      </html>
  }
}


export default function App() {
  return <Outlet />;
}
