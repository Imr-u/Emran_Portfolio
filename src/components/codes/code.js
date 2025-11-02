import covid19 from './covid19';
import cyclistic from './cyclistic';
import nashville from './nashville';

const Code = (code) => {
  switch (code) {
    case 'Covid19':
      return covid19;
    case 'Cyclistic':
      return cyclistic;
    case 'Nashville':
      return nashville;
    default:
      return '';
  }
};

export default Code;