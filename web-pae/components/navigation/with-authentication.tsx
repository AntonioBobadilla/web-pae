/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

type withAuthenticationProps = {
  WrappedComponent: React.ComponentType<any>;
};

const withAuthentication = (WrappedComponent: withAuthenticationProps) => {
  const RequiresAuthentication = (props: any) => {
    // get user role from redux state
    const { push, asPath, events } = useRouter();
    // const role = useAppSelector(selectRole);

    const [authorized, setAuthorized] = useState(false);
    // const { token, setToken } = getToken();

    const publicPaths = useMemo(
      () => [
        '/login',
        '/forgot-password',
        '/registration',
        '/reset-password',
        '/register'
      ],
      []
    );

    function getItem(key: string) {
      const itemString = sessionStorage.getItem(key);
      const userItem = JSON.parse(itemString);

      return userItem;
    }

    function authCheck(url: string) {
      // redirect to login page if accessing a private page and not logged in
      //   console.log(role);
      // format url
      const token = getItem('token');
      const role = getItem('role');

      const pathWithoutQuery = url.split('?')[0];
      const path = pathWithoutQuery.replace(`/${role}`, '');

      // check if path is public
      const isPublic = publicPaths.includes(path);
      // check if user is logged in
      const isUserPath = pathWithoutQuery.includes(`/${role}`);
      const isLoggedIn = token !== null;
      //   console.log(token, role, isUserPath, isLoggedIn, path, isPublic);
      // if user is logged in and accessing a public page, redirect to home
      const isAuthorized = isLoggedIn && !isPublic && isUserPath;

      if (isAuthorized) {
        console.log('authorized');
        setAuthorized(true);
      } else {
        console.log('not authorized');
        setAuthorized(false);
        push({
          pathname: `/`
        });
      }
    }

    useEffect(() => {
      // on initial load - run auth check
      authCheck(asPath);
    }, [asPath]);

    // if there's a loggedInUser, show the wrapped page, otherwise show a loading indicator
    return authorized ? <WrappedComponent {...props} /> : <div>Loading...</div>;
  };

  return RequiresAuthentication;
};

export default withAuthentication;
