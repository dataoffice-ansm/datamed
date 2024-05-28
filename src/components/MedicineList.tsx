import React, {useState} from 'react';
import ArrowFirst from '../assets/pictos/icons/pagination/first.svg';
import ArrowPrevious from '../assets/pictos/icons/pagination/previous.svg';
import ArrowNext from '../assets/pictos/icons/pagination/next.svg';
import ArrowLast from '../assets/pictos/icons/pagination/last.svg';

interface Medicine {
    id: number;
    name: string;
    // Ajouter d'autres propriétés ici conformément à la base de données
}

interface MedicineListProps {
    medicines: Medicine[];
}

const MedicineList: React.FC<MedicineListProps> = ({medicines}) => {
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
        <div className="bg-white rounded-lg p-4 shadow my-8">
            <p className="text-dark-green px-4">{medicines.length} médicaments identifiés</p>
            <div className="bg-white rounded-lg p-4 my-8 shadow">
                {currentItems.map((medicine, index) => (
                    <div key={medicine.id} className={`${index < currentItems.length - 1 ? 'border-b border-grey-50' : ''} py-2`}>
                        {medicine.name}
                    </div>
                ))}
            </div>
            <div className="flex justify-between">
                <div className="flex">
                    <p>Nombre de lignes par page : </p>
                    <select value={itemsPerPage} onChange={handleChangeItemsPerPage}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>

                <div className="flex justify-between align-middle gap-2">
                    <button onClick={() => handleChangePage(1)} disabled={currentPage === 1}>
                        <ArrowFirst style={{width: '24px'}}/>
                    </button>
                    <button onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage === 1}>
                        <ArrowPrevious style={{width: '24px'}}/>
                    </button>
                    <span className="m-auto">
                        {currentPage}/{totalPages}
                    </span>
                    <button onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage === totalPages}>
                        <ArrowNext style={{width: '24px'}}/>
                    </button>
                    <button onClick={() => handleChangePage(totalPages)} disabled={currentPage === totalPages}>
                        <ArrowLast style={{width: '24px'}}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MedicineList;