const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600">Page Not Found</p>
        <p className="text-gray-500 mt-4">
          The page you are looking for might be in another castle.
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
