const Loading = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <div className="border-green-normal h-14 w-14 animate-spin rounded-full border-0 border-y-2"></div>
      <p>Loading Application...</p>
    </div>
  );
};

export default Loading;
