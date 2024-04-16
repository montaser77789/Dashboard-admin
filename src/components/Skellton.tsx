const Skeleton = () => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
        <tbody className="bg-white divide-y divide-gray-200">
          {[...Array(10)].map((_, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="px-4 py-2 whitespace-nowrap">
                <div className="w-20 h-4 bg-gray-300 animate-pulse"></div>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <div className="w-20 h-4 bg-gray-300 animate-pulse"></div>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <div className="w-20 h-4 bg-gray-300 animate-pulse"></div>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <div className="w-20 h-4 bg-gray-300 animate-pulse"></div>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <div className="w-20 h-4 bg-gray-300 animate-pulse"></div>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <div className="w-20 h-4 bg-gray-300 animate-pulse"></div>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <div className="w-20 h-4 bg-gray-300 animate-pulse"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Skeleton;
