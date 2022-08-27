import Image from 'next/image';
const LoadingSpinner = () => {
  return (
    <Image alt='loading spinner' src='/tail-spin.svg' width={50} height={50} />
  );
};

export default LoadingSpinner;
