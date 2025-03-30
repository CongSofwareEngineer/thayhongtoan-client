import { useEffect } from 'react';
import useMedia from './useMedia';
const useAos = (time = 800) => {
	const { isMobile } = useMedia();

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
		const Aos = require('aos');
		setTimeout(() => {
			Aos.init({
				duration: time,
			});
		}, 500);
	}, [time, isMobile]);
};

export default useAos;
