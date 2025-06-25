'use client';

export default function SubNavbar({ categoryOptions, facilityOptions, category, setCategory, facility, setFacility }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6">
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="p-2 border rounded-md min-w-[180px] bg-transparent focus:bg-gray-900 focus:text-white transition-colors duration-200"
      >
        <option value="">All Categories</option>
        {categoryOptions.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select
        value={facility}
        onChange={e => setFacility(e.target.value)}
        className="p-2 border rounded-md min-w-[180px] bg-transparent focus:bg-gray-900 focus:text-white transition-colors duration-200"
      >
        <option value="">All Facilities</option>
        {facilityOptions.map(f => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>
    </div>
  );
}