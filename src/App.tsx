import React from 'react';
import { GMapsAddressLink } from './AddressCard';
import { getStreetCollection, getStreetNumbers } from './addressHelperApi';
import type { Address, Street, StreetNumber } from './types';
import { extractStreetName, extractStreetNumber } from './utils';

function App() {
  const [validAddress, setValidAddress] = React.useState<Address>();
  const [message, setMessage] = React.useState<string>(
    'Enter the address you want to validate above ☝',
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { value: addressString } = e.currentTarget[0] as HTMLInputElement;

      const extractedStreetName = extractStreetName(addressString);
      const extractedStreetNumber = extractStreetNumber(addressString);

      if (!extractedStreetName || !extractedStreetNumber) {
        throw new Error('Address must include a street name and number ❌');
      }

      /**
       * TODO: We should handle cases where there are multiple streets with the same name
       * in different cities. Right now it picks the first match and fetches the
       * street numbers for that street. It's possible to include the city in the
       * address string, but it requires a specific format.
       */
      const { streets } = await getStreetCollection(extractedStreetName);

      const streetNameMatch = (s: Street) =>
        s.streetName === extractedStreetName.split(',')[0].toUpperCase(); // Get the city if present after comma

      const validStreetName = streets.find(streetNameMatch);

      if (!validStreetName) {
        throw new Error(`${addressString} is not a valid address ❌`);
      }

      const streetIds = streets.flatMap((s) => s.streetIds);
      const { streetNumbers } = await getStreetNumbers(
        streetIds,
        extractedStreetNumber.number,
      );

      const streetNumberMatch = (s: StreetNumber) => {
        if (!s.entrance && !extractedStreetNumber.entrance) {
          return s.streetNo === extractedStreetNumber.number;
        }

        return (
          s.streetNo === extractedStreetNumber.number &&
          s.entrance === extractedStreetNumber.entrance?.toUpperCase()
        );
      };

      const validStreetNumber = streetNumbers.find(streetNumberMatch);

      if (validStreetNumber) {
        setMessage('Valid address!✔');
        setValidAddress({
          street: validStreetName,
          number: validStreetNumber,
        });
      } else {
        throw new Error(`${addressString} is not a valid address ❌`);
      }
    } catch (error) {
      setMessage((error as Error).message);
      setValidAddress(undefined);
    }
  };

  return (
    <div className="flex flex-col gap-10 items-center min-h-screen p-2 pt-32 text-blue-950 bg-orange-50">
      <h1 className="text-3xl font-bold text-center">
        {import.meta.env.VITE_APP_TITLE}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="text-lg grid gap-3 max-w-lg w-full"
      >
        <div>
          <h2 className="place-self-center">
            Enter the address you want to validate
          </h2>
          <p className="text-sm">
            ℹ️ The validator can only validate a street name with a number and an
            entrance letter (if applicable).
          </p>
        </div>

        <input
          type="text"
          placeholder="Westye Egebergs gate 7c"
          className="mt-4 p-4 border border-gray-300 rounded bg-orange-100"
        />
        <button
          type="submit"
          className="mt-2 p-4 bg-blue-900 text-orange-50 rounded shadow-md"
        >
          Validate address
        </button>
        <p className="text-base p-4 place-self-center">{message}</p>
      </form>

      {validAddress && <GMapsAddressLink address={validAddress} />}
    </div>
  );
}

export default App;
