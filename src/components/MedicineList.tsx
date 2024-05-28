import React, { useState } from 'react';

interface Medicine {
    id: number;
    name: string;
    // Add other medicine properties here
}

interface MedicineListProps {
    medicines: Medicine[];
}

const MedicineList: React.FC<MedicineListProps> = ({ medicines }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handleChangePage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleChangeItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(1); // Reset to first page when items per page change
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = medicines.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(medicines.length / itemsPerPage);

    return (
        <div className="bg-white rounded-lg p-4 shadow-md">
            <h2>Total Medicines: {medicines.length}</h2>
            {currentItems.map((medicine) => (
                <div key={medicine.id}>{medicine.name}</div>
            ))}
            <div>
                <select value={itemsPerPage} onChange={handleChangeItemsPerPage}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button key={pageNumber} onClick={() => handleChangePage(pageNumber)}>
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MedicineList;