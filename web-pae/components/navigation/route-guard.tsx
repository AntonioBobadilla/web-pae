/* eslint-disable react/jsx-no-useless-fragment */
import useToken from '@/hooks/useToken';
import { selectType } from '@/redux/user';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from 'store/hook';

type RouteGuardProps = {
  children: React.ReactNode;
};

export default function RouteGuard({ children }: RouteGuardProps) {
  const { push, asPath, events } = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const { token, setToken } = useToken();
  const userType = useAppSelector(selectType);

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

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in

    // format url
    const pathWithoutQuery = url.split('?')[0];
    const path = pathWithoutQuery.replace(`/${userType}`, '');

    // check if path is public
    const isPublic = publicPaths.includes(path);
    // check if user is logged in
    const isUserPath = path.includes(`/${userType}`);
    const isLoggedIn = token !== null;

    // if user is logged in and accessing a public page, redirect to home
    const isAuthorized = isLoggedIn && isPublic && isUserPath;

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

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      events.off('routeChangeStart', hideContent);
      events.off('routeChangeComplete', authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  return <>{authorized && children}</>;
}
