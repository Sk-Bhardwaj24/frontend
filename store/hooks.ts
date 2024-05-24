import { useDispatch, useSelector, useStore } from 'react-redux'
import type { RootState, AppDispatch } from './index'
import cookie from 'js-cookie';
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import store from './index';
import { fetchUserDetail } from './Auth';

/**
 * a custom hook that will redirect user to login page if trying to access route that is protected.
 * @returns {boolean} isLoading - returns true after user's token is verified (if token exists)
 */
export const useSplashScreenLoading = (): boolean => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const router = useRouter();

	const loginRedirection = async () => {
		const isUserValid:any  = await store.dispatch(
			fetchUserDetail()
		);
		const isSecureRoute = router.pathname.split('/')[1] === 'secure';
		if (isUserValid?.payload?.isUserValid) {
            if(!isSecureRoute)
			 await router.push('/secure/dashboard');
		} else {
			// if user is not valid and trying to access protected route redirect user to login page.
			if (isSecureRoute) await router.push('/login');
		}
		setIsLoading(false);
	};

	useEffect(() => {
		console.log('** useSplashScreenLoading hook useEffect ran');
		const token = cookie.get('token') ;
		if (token) {
			loginRedirection();
		} else {
			const isSecureRoute = router.pathname.split('/')[1] === 'secure';
			if (isSecureRoute) {
				router.push('/login').then(() => {
					setIsLoading(false);
				});
			} else {
				setIsLoading(false);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return isLoading;
};
