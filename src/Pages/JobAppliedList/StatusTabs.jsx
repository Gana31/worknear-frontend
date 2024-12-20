
export function StatusTabs({ currentStatus, onStatusChange }) {
  const tabs = [
    { label: 'Pending', value: 'pending' },
    { label: 'Accepted', value: 'accept' },
    { label: 'Rejected', value: 'reject' }
  ];

  return (
    <div className="flex space-x-1 rounded-xl bg-gray-200 p-1 mb-6">
      {tabs.map(tab => (
        <button
          key={tab.value}
          className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5
            ${currentStatus === tab.value
              ? 'bg-white text-blue-600 shadow'
              : 'text-gray-600 hover:text-gray-700'
            }`}
          onClick={() => onStatusChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}