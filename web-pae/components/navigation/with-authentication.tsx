/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from 'store/hook';
import { selectRole, selectToken } from 'store/reducers/user';
import LoadingScreen from '../transitions/loading-screen';

type withAuthenticationProps = {
  WrappedComponent: React.ComponentType<any>;
};

const withAuthentication = (WrappedComponent: withAuthenticationProps) => {
  const RequiresAuthentication = (props: any) => {
    // get user role from redux state
    const { push, asPath } = useRouter();
    const token = useAppSelector(selectToken);
    const role = useAppSelector(selectRole);
    const [authorized, setAuthorized] = useState(false);

    const publicPaths = useMemo(
      () => [
        '/login',
        '/forgot-password',
        '/registration',
        '/reset-password',
        '/register',
        '/register-confirmation'
      ],
      []
    );

    function authCheck(url: string) {
      // redirect to login page if accessing a private page and not logged in
      //   console.log(role);
      // format url

      const pathWithoutQuery = url.split('?')[0];
      const checkRole = role || pathWithoutQuery.split('/')[1];
      const path = pathWithoutQuery.replace(`/${checkRole}`, '');

      // check if path is public
      const isPublic = publicPaths.includes(path);
      // check if user is logged in
      const isUserPath = pathWithoutQuery.includes(`/${checkRole}`);
      const isLoggedIn = token !== null && token !== undefined && token !== '';
      // console.log(token, role, isUserPath, isLoggedIn, path, isPublic);
      // if user is logged in and accessing a public page, redirect to home
      const isAuthorized = isLoggedIn && !isPublic && isUserPath;

      if (isPublic && !isLoggedIn) {
        setAuthorized(true);
      } else if (isAuthorized) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
        if (isLoggedIn) {
          push(`/${role}/home`);
        } else {
          push({
            pathname: `/${checkRole}/login`
          });
        }
      }
    }

    useEffect(() => {
      // on initial load - run auth check
      authCheck(asPath);
    }, [asPath]);

    // if there's a loggedInUser, show the wrapped page, otherwise show a loading indicator
    return authorized ? <WrappedComponent {...props} /> : <LoadingScreen />;
  };

  return RequiresAuthentication;
};

export default withAuthentication;
