interface CardProps {
  title: string;
  description: string;
  buttonText1: string;
  buttonText2: string;
}

const Card = ({ title, description, buttonText1, buttonText2 }: CardProps) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
      <div className="p-4">
        <h5 className="mb-2 text-2xl font-bold text-gray-900">{title}</h5>
        <p className="mb-4 text-gray-700">{description}</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {buttonText1}
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {buttonText2}
        </button>
      </div>
    </div>
  );
};

export default Card;
