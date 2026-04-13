interface ReflexionsFragenProps {
  fragen: string[];
}

export function ReflexionsFragen({ fragen }: ReflexionsFragenProps) {
  if (fragen.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-xl font-semibold text-gray-900">
        Reflexionsfragen
      </h2>
      <ol className="list-decimal space-y-2 pl-5">
        {fragen.map((frage, index) => (
          <li key={index} className="text-gray-700">
            {frage}
          </li>
        ))}
      </ol>
    </section>
  );
}
