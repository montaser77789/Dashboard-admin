const Skeleton = () => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <tbody className="bg-white divide-y divide-gray-200">
        {[...Array(6)].map((_, idx) => (
          <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="w-10 h-4 bg-gray-300 animate-pulse"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="w-20 h-4 bg-gray-300 animate-pulse"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="w-10 h-4 bg-gray-300 animate-pulse"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="w-20 h-4 bg-gray-300 animate-pulse"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="w-10 h-4 bg-gray-300 animate-pulse"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="w-10 h-4 bg-gray-300 animate-pulse"></div>
            </td> <td className="px-6 py-4 whitespace-nowrap">
              <div className="w-10 h-4 bg-gray-300 animate-pulse"></div>
            </td>

           
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Skeleton;
