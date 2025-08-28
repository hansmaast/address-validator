import type { Address } from './types';

export const GMapsAddressLink = ({ address }: { address: Address }) => {
  const { number } = address;

  const gMapsHref = `https://www.google.com/maps/search/?api=1&query=${number.latitude},${number.longitude}`;

  return (
    <div className="grid gap-6 p-4 bg-blue-50 rounded shadow-md max-w-lg w-full">
      <p className="grid gap-1">
        <span className="font-semibold px-2">
          {address.street.streetName} {address.number.streetNo}
          {address.number.entrance}
        </span>
        <span className="px-2">
          {address.number.postalCode} {address.street.city}
        </span>
        <span className="row-start-1 justify-self-end bg-blue-200 p-2 rounded-2xl text-xs">
          {address.street.countryCode}
        </span>
      </p>

      <a
        className="p-4 bg-blue-950 text-blue-50 rounded text-center"
        href={gMapsHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in Google Maps
      </a>
    </div>
  );
};
