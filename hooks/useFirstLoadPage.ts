import { OBSERVER_KEY } from '@/constants/app';
import ObserverService from '@/services/observer';
import { useEffect } from 'react';

const useFirstLoadPage = () => {
	useEffect(() => {
		ObserverService.emit(OBSERVER_KEY.FirstLoadPage);
	}, []);
};

export default useFirstLoadPage;
