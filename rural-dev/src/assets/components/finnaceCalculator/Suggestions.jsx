const Suggestions = ({ suggestions }) => {
    return (
      <div className="mt-4 bg-red-100 p-4 rounded-lg">
        <h3 className="text-xl font-semibold text-red-700">Expense Suggestions:</h3>
        <ul className="list-disc list-inside text-red-600">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Suggestions;
  